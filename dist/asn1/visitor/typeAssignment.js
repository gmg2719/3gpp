"use strict";
exports.__esModule = true;
var TypeAssignmentVisitor = /** @class */ (function () {
    function TypeAssignmentVisitor() {
    }
    TypeAssignmentVisitor.prototype.visitChildren = function (typeAssignmentCtx) {
        if (!typeAssignmentCtx) {
            return;
        }
        if (typeAssignmentCtx.children) {
            // TODO
        }
    };
    return TypeAssignmentVisitor;
}());
exports.TypeAssignmentVisitor = TypeAssignmentVisitor;
