import { ruleName } from '../antlrUtils';

interface IAssignmentList {
  assignmentList: any;
  constantList: any;
}

export class AssignmentListVisitor {
  private visitChildren(assignmentListCtx: any): any {
    if (!assignmentListCtx) {
      return;
    }
    const assignmentList: IAssignmentList = {
      assignmentList: null,
      constantList: null,
    };
    if (assignmentListCtx.children) {
      for (const assignmentCtx of assignmentListCtx.children) {
        switch (ruleName(assignmentCtx.children[1], assignmentCtx)) {
          case 'valueAssignment': {
            break;
          }
          case 'typeAssignment': {
            break;
          }
          case 'parameterizedAssignment': {
            break;
          }
          case 'objectClassAssignment': {
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    return assignmentList;
  }
}
