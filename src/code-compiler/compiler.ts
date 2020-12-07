import { Injectable } from '@homebots/elements';
import { flatten } from './helpers';
import { createParser } from './parser';
import { Node } from './tokens';
import { AssignLabelAddressVisitor, LocateLabelVisitor, ResolveReferenceVisitor, Visitor } from './visitors';

@Injectable()
export class Compiler {
  private parser = createParser();
  private visitors: Visitor[] = [
    new ResolveReferenceVisitor(),
    new LocateLabelVisitor(),
    new AssignLabelAddressVisitor(),
  ];

  compile(code: string): number[] {
    const nodes = flatten(this.parser.parse(code) as Node[]);
    const context = { nodes };

    for (const visitor of this.visitors) {
      let cursor = 0;
      // debugger;

      while (cursor < nodes.length) {
        const newNodes = visitor.visit(nodes[cursor], cursor, context);
        if (newNodes === null) {
          nodes.splice(cursor, 1);
          continue;
        }

        if (Array.isArray(newNodes)) {
          nodes.splice(cursor, 1, ...newNodes);
          cursor += newNodes.length;
          continue;
        }

        if (newNodes !== nodes[cursor]) {
          nodes[cursor] = newNodes;
        }

        cursor++;
      }
    }

    return nodes.filter((node) => node !== null).reduce((stream, node) => stream.concat(node.bytes), []);
  }
}
