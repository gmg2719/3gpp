"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var typeAssignment_1 = require("./typeAssignment");
var valueAssignment_1 = require("./valueAssignment");
// assignmentList :  (assignment) (assignment)*
// assignment :
//  (IDENTIFIER
// 	(  valueAssignment
// 	 | typeAssignment
// 	 | parameterizedAssignment
// 	 | objectClassAssignment
// 	)
//  )
var AssignmentListVisitor = /** @class */ (function () {
    function AssignmentListVisitor() {
    }
    AssignmentListVisitor.prototype.visitChildren = function (assignmentListCtx) {
        var assignments = {
            types: {},
            constants: {}
        };
        for (var _i = 0, _a = assignmentListCtx.children; _i < _a.length; _i++) {
            var assignmentCtx = _a[_i];
            var identifier = assignmentCtx.children[0].getText();
            var childCtx = assignmentCtx.children[1];
            switch (antlrUtils_1.ruleName(childCtx)) {
                case 'valueAssignment': {
                    var valueAssignment = childCtx.accept(new valueAssignment_1.ValueAssignmentVisitor());
                    if (valueAssignment) {
                        assignments.constants[identifier] = valueAssignment;
                    }
                    break;
                }
                case 'typeAssignment': {
                    var typeDefinition = childCtx.accept(new typeAssignment_1.TypeAssignmentVisitor());
                    assignments.types[identifier] = typeDefinition;
                    break;
                }
                case 'parameterizedAssignment': {
                    // TODO
                    break;
                }
                case 'objectClassAssignment': {
                    // TODO: TBD
                    break;
                }
                default: {
                    break;
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
