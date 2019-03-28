import { ruleName } from '../antlrUtils';
import { ModuleBodyVisitor } from './moduleBody';

// moduleDefinition :  IDENTIFIER (L_BRACE (IDENTIFIER L_PARAN NUMBER R_PARAN)* R_BRACE)?
//      DEFINITIONS_LITERAL
//      tagDefault
//      extensionDefault
//      ASSIGN_OP
//       BEGIN_LITERAL
//      moduleBody
//       END_LITERAL

export class ModuleDefinitionVisitor {
  private visitChildren(moduleDefinitionCtx: any): any {
    const moduleName = moduleDefinitionCtx.children[0].getText();
    for (const childCtx of moduleDefinitionCtx.children) {
      if (ruleName(childCtx) === 'moduleBody') {
        const moduleBody = childCtx.accept(new ModuleBodyVisitor());
        return {moduleName, moduleBody};
      }
    }
    throw Error(`ASN.1 is badly written\n${moduleDefinitionCtx.getText()}`);
  }
}
