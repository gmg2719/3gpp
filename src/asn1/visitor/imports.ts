import { matchesRule } from '../antlrUtils';
import { SymbolsImportedVisitor } from './symbolsImported';

export class ImportsVisitor {
  private visitChildren(importsCtx: any): any {
    if (!importsCtx) {
      return;
    }
    let imports = null;
    if (importsCtx.children) {
      for (const child of importsCtx.children) {
        if (matchesRule(child, importsCtx, 'symbolsImported')) {
          imports = child.accept(new SymbolsImportedVisitor());
        }
      }
    }
    return imports;
  }
}
