import { matchesRule } from '../antlrUtils';
import { ImportsVisitor } from './imports';

export class ModuleBodyVisitor {
  private visitChildren(moduleBodyCtx: any): any {
    if (!moduleBodyCtx) {
      return;
    }
    const moduleBody: any = {};
    if (moduleBodyCtx.children) {
      for (const child of moduleBodyCtx.children) {
        if (matchesRule(child, moduleBodyCtx, 'imports')) {
          moduleBody.imports = child.accept(new ImportsVisitor());
        } else if (matchesRule(child, moduleBodyCtx, 'assignmentList')) {
          moduleBody.assignmentList = {};
        }
      }
    }
    return moduleBody;
  }
}
