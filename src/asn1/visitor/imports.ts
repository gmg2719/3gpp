import { ruleName } from '../antlrUtils';
import { SymbolsImportedVisitor } from './symbolsImported';

export class ImportsVisitor {
  private visitChildren(importsCtx: any): any {
    let imports = null;
    if (importsCtx.children) {
      for (const childCtx of importsCtx.children) {
        if (ruleName(childCtx) === 'symbolsImported') {
          imports = childCtx.accept(new SymbolsImportedVisitor());
        }
      }
    }
    return imports;
  }
}
