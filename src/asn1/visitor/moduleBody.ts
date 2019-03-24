import { ruleName } from '../antlrUtils';
import { AssignmentListVisitor } from './assignmentList';
import { ImportsVisitor } from './imports';

interface IModuleBody {
  imports: any;
  types: any;
  constants: any;
}

export class ModuleBodyVisitor {
  private visitChildren(moduleBodyCtx: any): any {
    if (!moduleBodyCtx) {
      return;
    }
    const moduleBody: IModuleBody = {
      imports: null,
      types: null,
      constants: null,
    };
    if (moduleBodyCtx.children) {
      for (const childCtx of moduleBodyCtx.children) {
        switch (ruleName(childCtx, moduleBodyCtx)) {
          case 'imports': {
            moduleBody.imports = childCtx.accept(new ImportsVisitor());
            break;
          }
          case 'assignmentList': {
            const {types, constants} = childCtx.accept(new AssignmentListVisitor());
            moduleBody.types = types;
            moduleBody.constants = constants;
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
