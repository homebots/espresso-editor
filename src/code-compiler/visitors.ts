import { Reference, Node, LabelNode, LabelReferenceNode, int32 } from './tokens';

const toInt32 = (number) => Array.from(new Uint8Array(new Uint32Array([number]).buffer)) as int32;

export interface Visitor {
  visit(node: Node, index: number, context: any): Node[] | Node | null;
}

export class ResolveReferenceVisitor implements Visitor {
  visit(node: Node, _: number, context: any): Node | null {
    if (node instanceof Reference) {
      if (node.create) {
        this.createReference(node.name, context);
      }

      if (context.references.has(node.name) === false) {
        throw new ReferenceError(`Undefined reference: ${node.name}`);
      }

      node.reference = context.references.get(node.name);
      return null;
    }

    return node;
  }

  getReferenceMap(context) {
    if (!context.references) {
      context.references = new Map();
    }

    return context.references;
  }

  createReference(name: string, context) {
    const ids = this.getReferenceMap(context);

    if (!ids.has(name)) {
      ids.set(name, ids.size);
    }
  }
}

export class LocateLabelVisitor implements Visitor {
  visit(node: Node, index: number, context: any): Node | null {
    if (node instanceof LabelNode) {
      const labelMap = this.getReferenceMap(context);

      if (labelMap.has(node.label)) {
        throw new SyntaxError(`Duplicated label ${node.label}`);
      }

      labelMap.set(node.label, index);
    }

    return node;
  }

  getReferenceMap(context: any) {
    if (!context.labelPosition) {
      context.labelPosition = new Map();
    }

    return context.labelPosition;
  }
}

export class AssignLabelAddressVisitor implements Visitor {
  visit(node: Node, _: number, context: any): Node | null {
    if (node instanceof LabelReferenceNode) {
      node.address = toInt32(this.calculateAddress(node, context));
      return null;
    }

    return node;
  }

  private calculateAddress(node: LabelReferenceNode, context: any) {
    const map = this.getReferenceMap(context);
    const index = map.get(node.label);
    const nodes: Node[] = context.nodes.slice(0, index);

    return nodes.reduce((address, node) => (address += node.length), 0);
  }

  private getReferenceMap(context: any) {
    if (!context.labelPosition) {
      throw new ReferenceError('Label indexes were not found');
    }

    return context.labelPosition;
  }
}
