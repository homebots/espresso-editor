import * as peg from 'pegjs';
import * as OpCode from './constants';
import * as T from './tokens';
import grammar from './grammar.peg-grammar';

export function createParser<T>(context: T) {
  const parserCode = peg.generate(grammar, { output: 'source', optimize: 'speed' });
  const compiler = (Function(
    '_',
    'T',
    'OpCode',
    'return 0, ' + parserCode,
  )(context, T, OpCode) as unknown) as peg.Parser;

  return compiler;
}
