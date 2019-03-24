import { ruleName } from '../antlrUtils';
import { ImportsVisitor } from './imports';

interface IModuleBody {
  imports: any;
  assignmentList: any;
  constantList: any;
}

export class ModuleBodyVisitor {
  private visitChildren(moduleBodyCtx: any): any {
    if (!moduleBodyCtx) {
      return;
    }
    const moduleBody: IModuleBody = {
      imports: null,
      assignmentList: null,
      constantList: null,
    };
    if (moduleBodyCtx.children) {
      for (const childCtx of moduleBodyCtx.children) {
        switch (ruleName(childCtx, moduleBodyCtx)) {
          case 'imports': {
            moduleBody.imports = childCtx.accept(new ImportsVisitor());
            break;
          }
          case 'assignmentList': {
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    return moduleBody;
  }
}
