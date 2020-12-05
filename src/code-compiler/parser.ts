import * as peg from 'pegjs';
import * as T from './tokens';
import grammar from './grammar.peg-grammar';

export function createParser<T>(context: T) {
  const parserCode = peg.generate(grammar, { output: 'source', optimize: 'speed' });
  const compiler = (Function('_', 'T', 'return 0, ' + parserCode)(context, T) as unknown) as peg.Parser;

  return compiler;
}
