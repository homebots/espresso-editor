import { Injectable } from '@homebots/elements';
import { createParser } from './parser';
import { Node } from './tokens';

class Context {
  identifiers = new Map();
  labelPositions = new Map();
  stream = [];
}

@Injectable()
export class Compiler {
  private compiler = createParser(this);

  compile(code: string) {
    const nodes = this.compiler.parse(code);
    // const context = new Context();
    // this.resolveIdentifiers(nodes, context);
    // this.findLabelLocations(nodes, context);
    return nodes;
  }

  digest(nodes: Node[]) {
    return this.reduce(nodes.filter(Boolean));
  }

  // resolveIdentifiers(nodes: Node[], context: Context) {}

  // findLabelLocations(nodes: Node[], context: Context) {}

  // transform(nodes: Node[], _: Context) {
  //   return nodes;
  // }

  reduce(nodes: Node[]) {
    return nodes.reduce((stream, node) => stream.concat(node.bytes), []);
  }
}
