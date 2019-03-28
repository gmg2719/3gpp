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
    for (const childCtx of moduleBodyCtx.children) {
      switch (ruleName(childCtx)) {
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
        case 'exports': {
          // TODO
          break;
        }
        default: {
          throw Error(`ASN.1 contains unsupported expression\n${moduleBodyCtx.getText()}`);
        }
      }
    }
    return moduleBody;
  }
}
