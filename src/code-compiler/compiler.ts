import { Injectable } from '@homebots/elements';
import * as peg from 'pegjs';

const charCode = (char: string) => char.charCodeAt(0);

class Context {
  private at = 0;
  private bytes: number[] = [];

  constructor(public code: string) {}

  get binary(): Uint8Array {
    return new Uint8Array(this.bytes);
  }

  get next() {
    return this.code[this.at];
  }
}

@Injectable()
export class Compiler {
  compile(code: string) {
    const context = new Context(code);
    this.parse(context);
    // this.transform(context);
    return context.binary;
  }

  parse(context) {
    // const grammar =
  }
}
