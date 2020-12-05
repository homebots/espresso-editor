import { Injectable } from '@homebots/elements';
import { createParser } from './parser';

class Context {
  identifiers = new Map();
  labelPositions = new Map();
  stream = [];
}

@Injectable()
export class Compiler {
  private compiler = createParser();

  compile(code: string) {
    const nodes = this.compiler.parse(code);
    const context = new Context();

    this.resolveIdentifiers(nodes, context);
    this.findLabelLocations(nodes, context);
    return this.transform(nodes, context);
  }

  resolveIdentifiers(nodes: Node[], context: Context) {}

  transform(nodes: Node[], context: Context) {}

  findLabelLocations(nodes: Node[], context: Context) {}

  reduce(nodes: Node[]) {
    return nodes.reduce((stream, node) => stream.concat(node.bytes), []);
  }
}
