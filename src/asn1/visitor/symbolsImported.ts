import { ruleName } from '../antlrUtils';

export class SymbolsImportedVisitor {
  private visitChildren(symbolsImportedCtx: any): any {
    if (!symbolsImportedCtx) {
      return;
    }
    const imports: any = {};
    if (symbolsImportedCtx.children) {
      for (const symbolsFromModuleListCtx of symbolsImportedCtx.children) {
        for (const symbolsFromModuleCtx of symbolsFromModuleListCtx.children) {
          const symbolListCtx = symbolsFromModuleCtx.children[0];
          const symbolList = symbolListCtx.children.map((symbolCtx: any) => {
            if (ruleName(symbolCtx, symbolListCtx) === 'symbol') {
              return symbolCtx.getText();
            }
          }).filter((symbol: string) => {
            return symbol;
          });
          const moduleName = symbolsFromModuleCtx.children[2].getText();
          imports[moduleName] = symbolList;
        }
      }
    }
    return imports;
  }
}
