import { ruleName } from '../antlrUtils';
import { TypeAssignmentVisitor } from './typeAssignment';

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
          // TODO: Need to create ValueAssignmentVisitor
          const type = childCtx.children[0].getText();
          if (type !== 'INTEGER') {
            throw Error(`INTEGER is only supported currently\n${childCtx.getText()}`);
          }
          const value = Number(childCtx.children[2].getText());
          assignments.constants[identifier] = {type, value};
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
