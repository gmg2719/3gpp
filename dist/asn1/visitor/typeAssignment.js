"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
// typeAssignment :
//       ASSIGN_OP
//       asnType
// asnType : (builtinType | referencedType) (constraint)*
// referencedType :
//   definedType
var TypeAssignmentVisitor = /** @class */ (function () {
    function TypeAssignmentVisitor() {
    }
    TypeAssignmentVisitor.prototype.visitChildren = function (typeAssignmentCtx) {
        var asnTypeCtx = typeAssignmentCtx.children[1];
        var typeCtx = asnTypeCtx.children[0];
        switch (antlrUtils_1.ruleName(typeCtx)) {
            case 'builtinType': {
                // TODO
                break;
            }
            case 'referencedType': {
                // TODO: is it enough?
                return { referenceType: typeCtx.getText() };
            }
        }
    };
    return TypeAssignmentVisitor;
}());
exports.TypeAssignmentVisitor = TypeAssignmentVisitor;
