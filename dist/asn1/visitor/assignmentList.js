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
        var assignmentList = {
            assignmentList: null,
            constantList: null
        };
        if (assignmentListCtx.children) {
            for (var _i = 0, _a = assignmentListCtx.children; _i < _a.length; _i++) {
                var assignmentCtx = _a[_i];
                switch (antlrUtils_1.ruleName(assignmentCtx.children[1], assignmentCtx)) {
                    case 'valueAssignment': {
                        break;
                    }
                    case 'typeAssignment': {
                        break;
                    }
                    case 'parameterizedAssignment': {
                        break;
                    }
                    case 'objectClassAssignment': {
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        return assignmentList;
    };
    return AssignmentListVisitor;
}());
exports.AssignmentListVisitor = AssignmentListVisitor;
