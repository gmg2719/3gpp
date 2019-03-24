import { ruleName } from '../antlrUtils';
import { TypeAssignmentVisitor } from './typeAssignment';

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
            this.add(assignments.constants, identifier, {type, value});
            break;
          }
          case 'typeAssignment': {
            const {typeName, typeDefinition} = childCtx.accept(new TypeAssignmentVisitor());
            this.add(assignments.types, typeName, typeDefinition);
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

  private add(obj: any, typeName: string, typeDefinition: any): void {
    if (!obj) {
      obj = {};
    }
    obj[typeName] = typeDefinition;
  }
}
