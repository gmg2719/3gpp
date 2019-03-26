"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var TypeAssignmentVisitor = /** @class */ (function () {
    function TypeAssignmentVisitor() {
    }
    TypeAssignmentVisitor.prototype.visitChildren = function (typeAssignmentCtx) {
        if (!typeAssignmentCtx) {
            return;
        }
        // tslint:disable-next-line:prefer-const
        var asnTypeCtx = typeAssignmentCtx.children[1];
        var typeCtx = asnTypeCtx.children[0];
        switch (antlrUtils_1.ruleName(typeCtx, asnTypeCtx)) {
            case 'builtinType': {
                // TODO
                break;
            }
            case 'referencedType': {
                // TODO: is it enough?
                return { referenceType: typeCtx.getText() };
                break;
            }
        }
        return null;
    };
    return TypeAssignmentVisitor;
}());
exports.TypeAssignmentVisitor = TypeAssignmentVisitor;
