import { ruleName } from '../antlrUtils';
import { SymbolsImportedVisitor } from './symbolsImported';

export class ImportsVisitor {
  private visitChildren(importsCtx: any): any {
    if (!importsCtx) {
      return;
    }
    let imports = null;
    if (importsCtx.children) {
      for (const child of importsCtx.children) {
        if (ruleName(child, importsCtx) === 'symbolsImported') {
          imports = child.accept(new SymbolsImportedVisitor());
        }
      }
    }
    return imports;
  }
}
