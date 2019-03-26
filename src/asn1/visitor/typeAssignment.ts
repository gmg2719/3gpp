import { ruleName } from '../antlrUtils';

export class TypeAssignmentVisitor {
  private visitChildren(typeAssignmentCtx: any): any {
    if (!typeAssignmentCtx) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    const asnTypeCtx = typeAssignmentCtx.children[1];
    const typeCtx = asnTypeCtx.children[0];
    switch (ruleName(typeCtx, asnTypeCtx)) {
      case 'builtinType': {
        // TODO
        break;
      }
      case 'referencedType': {
        // TODO: is it enough?
        return {referenceType: typeCtx.getText()};
        break;
      }
    }
    return null;
  }
}
