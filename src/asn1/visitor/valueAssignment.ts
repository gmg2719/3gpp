interface IValueAssignment {
  type: string;
  value: any;
}

// valueAssignment :
//       asnType
// 	  ASSIGN_OP
//        value
// value  :   builtinValue

export class ValueAssignmentVisitor {
  private visitChildren(valueAssignmentCtx: any): any {
    const valueAssignment = {
      type: null,
      value: null,
    };
    valueAssignment.type = valueAssignmentCtx.children[0].getText();
    switch (valueAssignment.type) {
      case 'INTEGER': {
        valueAssignment.value = Number(valueAssignmentCtx.children[2].getText());
        break;
      }
      default: {
        // TODO: INTEGER only currently. TBD
        return null;
      }
    }
    return valueAssignment;
  }
}
