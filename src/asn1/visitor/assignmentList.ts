import { ruleName } from '../antlrUtils';
import { TypeAssignmentVisitor } from './typeAssignment';
import { ValueAssignmentVisitor } from './valueAssignment';

interface IAssignmentList {
  types: any;
  constants: any;
}

// assignmentList :  (assignment) (assignment)*
// assignment :
//  (IDENTIFIER
// 	(  valueAssignment
// 	 | typeAssignment
// 	 | parameterizedAssignment
// 	 | objectClassAssignment
// 	)
//  )

export class AssignmentListVisitor {
  private visitChildren(assignmentListCtx: any): any {
    const assignments: IAssignmentList = {
      types: {},
      constants: {},
    };
    for (const assignmentCtx of assignmentListCtx.children) {
      const identifier = assignmentCtx.children[0].getText();
      const childCtx = assignmentCtx.children[1];
      switch (ruleName(childCtx)) {
        case 'valueAssignment': {
          const valueAssignment = childCtx.accept(new ValueAssignmentVisitor())
          if (valueAssignment) {
            assignments.constants[identifier] = valueAssignment;
          }
          break;
        }
        case 'typeAssignment': {
          const typeDefinition = childCtx.accept(new TypeAssignmentVisitor());
          assignments.types[identifier] = typeDefinition;
          break;
        }
        case 'parameterizedAssignment': {
          // TODO
          break;
        }
        case 'objectClassAssignment': {
          // TODO: TBD
          break;
        }
        default: {
          break;
        }
      }
    }
    if (!Object.keys(assignments.types).length) {
      assignments.types = null;
    }
    if (!Object.keys(assignments.constants).length) {
      assignments.constants = null;
    }
    return assignments;
  }
}
