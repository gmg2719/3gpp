export class ModuleDefinitionVisitor {
  private modules: any;

  constructor(modules: any) {
    this.modules = modules;
  }

  private visitChildren(moduleDefinitionCtx: any): any {
    if (!moduleDefinitionCtx) {
      return;
    }
    if (moduleDefinitionCtx.children) {
      const moduleName = moduleDefinitionCtx.children[0].getText();
      this.modules[moduleName] = {};
    }
  }
}
