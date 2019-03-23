import { ModuleDefinitionVisitor } from './moduleDefinition';

export class ModulesVisitor {
  private visitChildren(modulesCtx: any): any {
    const modules = {};
    if (!modulesCtx) {
      return;
    }
    if (modulesCtx.children) {
      for (const moduleDefinitionCtx of modulesCtx.children) {
        const {moduleName, moduleBody} = moduleDefinitionCtx.accept(new ModuleDefinitionVisitor());
        modules[moduleName] = moduleBody;
      }
    }
    return modules;
  }
}
