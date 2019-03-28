import { ruleName } from '../antlrUtils';

// symbolsImported : (symbolsFromModuleList )?
// symbolsFromModuleList :
//      (symbolsFromModule) (symbolsFromModule)*
// symbolsFromModule : symbolList FROM_LITERAL globalModuleReference
// symbolList   : (symbol) (COMMA symbol)*
// globalModuleReference : IDENTIFIER assignedIdentifier
// assignedIdentifier :

export class SymbolsImportedVisitor {
  private visitChildren(symbolsImportedCtx: any): any {
    const imports: any = {};
    for (const symbolsFromModuleListCtx of symbolsImportedCtx.children) {
      for (const symbolsFromModuleCtx of symbolsFromModuleListCtx.children) {
        const symbolListCtx = symbolsFromModuleCtx.children[0];
        const symbolList = symbolListCtx.children.map((symbolCtx: any) => {
          if (ruleName(symbolCtx) === 'symbol') {
            return symbolCtx.getText();
          }
        }).filter((symbol: string) => {
          return symbol;
        });
        const moduleName = symbolsFromModuleCtx.children[2].getText();
        imports[moduleName] = symbolList;
      }
    }
    return imports;
  }
}
