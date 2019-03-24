import { ruleName } from '../antlrUtils';
import { AssignmentListVisitor } from './assignmentList';
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
            const {assignmentList, constantList} = childCtx.accept(new AssignmentListVisitor());
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
