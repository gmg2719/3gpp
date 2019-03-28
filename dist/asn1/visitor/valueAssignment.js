"use strict";
exports.__esModule = true;
// valueAssignment :
//       asnType
// 	  ASSIGN_OP
//        value
// value  :   builtinValue
var ValueAssignmentVisitor = /** @class */ (function () {
    function ValueAssignmentVisitor() {
    }
    ValueAssignmentVisitor.prototype.visitChildren = function (valueAssignmentCtx) {
        var valueAssignment = {
            type: null,
            value: null
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
    };
    return ValueAssignmentVisitor;
}());
exports.ValueAssignmentVisitor = ValueAssignmentVisitor;
