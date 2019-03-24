import { ruleName } from '../antlrUtils';

interface IAssignmentList {
  types: any;
  constants: any;
}

export class AssignmentListVisitor {
  private visitChildren(assignmentListCtx: any): any {
    if (!assignmentListCtx) {
      return;
    }
    const assignments: IAssignmentList = {
      types: null,
      constants: null,
    };
    if (assignmentListCtx.children) {
      for (const assignmentCtx of assignmentListCtx.children) {
        const childCtx = assignmentCtx.children[1];
        switch (ruleName(childCtx, assignmentCtx)) {
          case 'valueAssignment': {
            const identifier = assignmentCtx.children[0].getText();
            const type = childCtx.children[0].getText();
            const value = childCtx.children[2].getText();
            if (!assignments.constants) {
              assignments.constants = {};
            }
            assignments.constants[identifier] = {type, value};
            break;
          }
          case 'typeAssignment': {
            break;
          }
          case 'parameterizedAssignment': {
            break;
          }
          case 'objectClassAssignment': {
            // TBD
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    return assignments;
  }
}
