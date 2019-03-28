import { ruleName } from '../antlrUtils';

// typeAssignment :
//       ASSIGN_OP
//       asnType
// asnType : (builtinType | referencedType) (constraint)*
// referencedType :
//   definedType

export class TypeAssignmentVisitor {
  private visitChildren(typeAssignmentCtx: any): any {
    const asnTypeCtx = typeAssignmentCtx.children[1];
    const typeCtx = asnTypeCtx.children[0];
    switch (ruleName(typeCtx)) {
      case 'builtinType': {
        // TODO
        break;
      }
      case 'referencedType': {
        // TODO: is it enough?
        return {referenceType: typeCtx.getText()};
      }
    }
  }
}
