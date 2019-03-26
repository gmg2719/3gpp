"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var typeAssignment_1 = require("./typeAssignment");
var AssignmentListVisitor = /** @class */ (function () {
    function AssignmentListVisitor() {
    }
    AssignmentListVisitor.prototype.visitChildren = function (assignmentListCtx) {
        if (!assignmentListCtx) {
            return;
        }
        var assignments = {
            types: {},
            constants: {}
        };
        if (assignmentListCtx.children) {
            for (var _i = 0, _a = assignmentListCtx.children; _i < _a.length; _i++) {
                var assignmentCtx = _a[_i];
                var identifier = assignmentCtx.children[0].getText();
                var childCtx = assignmentCtx.children[1];
                switch (antlrUtils_1.ruleName(childCtx, assignmentCtx)) {
                    case 'valueAssignment': {
                        var type = childCtx.children[0].getText();
                        // TODO: Currently only support INTEGER constants
                        if (type !== 'INTEGER') {
                            break;
                        }
                        var value = Number(childCtx.children[2].getText());
                        assignments.constants[identifier] = { type: type, value: value };
                        break;
                    }
                    case 'typeAssignment': {
                        var typeDefinition = childCtx.accept(new typeAssignment_1.TypeAssignmentVisitor());
                        if (!typeDefinition) {
                            break;
                        }
                        assignments.types[identifier] = typeDefinition;
                        break;
                    }
                    case 'parameterizedAssignment': {
                        // TODO
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
        if (!Object.keys(assignments.types).length) {
            assignments.types = null;
        }
        if (!Object.keys(assignments.constants).length) {
            assignments.constants = null;
        }
        return assignments;
    };
    return AssignmentListVisitor;
}());
exports.AssignmentListVisitor = AssignmentListVisitor;
