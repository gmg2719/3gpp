"use strict";
exports.__esModule = true;
var TypeAssignmentVisitor = /** @class */ (function () {
    function TypeAssignmentVisitor() {
    }
    TypeAssignmentVisitor.prototype.visitChildren = function (typeAssignmentCtx) {
        if (!typeAssignmentCtx) {
            return;
        }
        // tslint:disable-next-line:prefer-const
        var typeDefinition = null;
        if (typeAssignmentCtx.children) {
            // TODO
        }
        return typeDefinition;
    };
    return TypeAssignmentVisitor;
}());
exports.TypeAssignmentVisitor = TypeAssignmentVisitor;
