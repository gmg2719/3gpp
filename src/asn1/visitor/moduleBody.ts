import { ruleName } from '../antlrUtils';
import { AssignmentListVisitor } from './assignmentList';
import { ImportsVisitor } from './imports';

interface IModuleBody {
  imports: any;
  types: any;
  constants: any;
}

// moduleBody :  (exports imports assignmentList) ?

export class ModuleBodyVisitor {
  private visitChildren(moduleBodyCtx: any): any {
    const moduleBody: IModuleBody = {
      imports: null,
      types: null,
      constants: null,
    };
    if (moduleBodyCtx.children) {
      for (const childCtx of moduleBodyCtx.children) {
        switch (ruleName(childCtx)) {
          case 'exports': {
            // TODO: TBD. exports always exists, but its child may not exist
            break;
          }
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
