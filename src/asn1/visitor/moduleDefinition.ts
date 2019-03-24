import { ruleName } from '../antlrUtils';
import { ModuleBodyVisitor } from './moduleBody';

export class ModuleDefinitionVisitor {
  private visitChildren(moduleDefinitionCtx: any): any {
    if (!moduleDefinitionCtx) {
      return;
    }
    if (moduleDefinitionCtx.children) {
      const moduleName = moduleDefinitionCtx.children[0].getText();
      for (const childCtx of moduleDefinitionCtx.children) {
        if (ruleName(childCtx, moduleDefinitionCtx) === 'moduleBody') {
          const moduleBody = childCtx.accept(new ModuleBodyVisitor());
          return {moduleName, moduleBody};
        }
      }
    }
  }
}
