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
            const identifier = assignmentCtx.children[0].getText();
            const valueAssignmentCtx = assignmentCtx.children[1];
            const type = valueAssignmentCtx.children[0].getText();
            const value = valueAssignmentCtx.children[2].getText();
            if (!assignmentList.constantList) {
              assignmentList.constantList = {};
            }
            assignmentList.constantList[identifier] = {type, value};
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
