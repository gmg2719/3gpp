"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var AssignmentListVisitor = /** @class */ (function () {
    function AssignmentListVisitor() {
    }
    AssignmentListVisitor.prototype.visitChildren = function (assignmentListCtx) {
        if (!assignmentListCtx) {
            return;
        }
        var assignments = {
            types: null,
            constants: null
        };
        if (assignmentListCtx.children) {
            for (var _i = 0, _a = assignmentListCtx.children; _i < _a.length; _i++) {
                var assignmentCtx = _a[_i];
                var childCtx = assignmentCtx.children[1];
                switch (antlrUtils_1.ruleName(childCtx, assignmentCtx)) {
                    case 'valueAssignment': {
                        var identifier = assignmentCtx.children[0].getText();
                        var type = childCtx.children[0].getText();
                        var value = childCtx.children[2].getText();
                        if (!assignments.constants) {
                            assignments.constants = {};
                        }
                        assignments.constants[identifier] = { type: type, value: value };
                        break;
                    }
                    case 'typeAssignment': {
                        break;
                    }
                    case 'parameterizedAssignment': {
                        break;
                    }
                    case 'objectClassAssignment': {
                        // TBD
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        return assignments;
    };
    return AssignmentListVisitor;
}());
exports.AssignmentListVisitor = AssignmentListVisitor;
