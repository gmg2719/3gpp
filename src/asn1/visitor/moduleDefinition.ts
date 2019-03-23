import { matchesRule } from '../antlrUtils';
import { ModuleBodyVisitor } from './moduleBody';

export class ModuleDefinitionVisitor {
  private visitChildren(moduleDefinitionCtx: any): any {
    if (!moduleDefinitionCtx) {
      return;
    }
    if (moduleDefinitionCtx.children) {
      const moduleName = moduleDefinitionCtx.children[0].getText();
      for (const child of moduleDefinitionCtx.children) {
        if (matchesRule(child, moduleDefinitionCtx, 'moduleBody')) {
          const moduleBody = child.accept(new ModuleBodyVisitor());
          return {moduleName, moduleBody};
        }
      }
    }
  }
}
