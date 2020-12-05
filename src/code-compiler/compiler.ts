import { Injectable } from '@homebots/elements';
import * as peg from 'pegjs';
import * as helpers from './helpers';
import grammar from './grammar.peg-grammar';

@Injectable()
export class Compiler {
  private parserCode = peg.generate(grammar, { output: 'source', optimize: 'speed' });
  private compiler = (Function('_', 'return 0, ' + this.parserCode)(helpers) as unknown) as peg.Parser;

  compile(code: string) {
    return this.compiler.parse(code);
  }
}
