import * as peg from 'pegjs';
import * as T from './tokens';
import * as helpers from './helpers';
import grammar from './grammar.peg-grammar';

export function createParser() {
  const parserCode = peg.generate(grammar, { output: 'source', optimize: 'speed' });
  const parserFunction = Function('_', 'T', 'helpers', 'return 0, ' + parserCode);
  const parser = (parserFunction(helpers, T) as unknown) as peg.Parser;

  return parser;
}
