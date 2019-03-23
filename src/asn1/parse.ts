import * as antlr4 from 'antlr4';

import { ASNLexer } from './ASNLexer';
import { ASNListener } from './ASNListener';
import { ASNParser } from './ASNParser';
import { ModulesVisitor } from './visitor/modules';


export function parse(text: string): any /* TODO */ {
  const chars = new antlr4.InputStream(text);
  const lexer = new ASNLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new ASNParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.modules();
  return tree.accept(new ModulesVisitor());
}
