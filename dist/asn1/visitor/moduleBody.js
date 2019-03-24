"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var assignmentList_1 = require("./assignmentList");
var imports_1 = require("./imports");
var ModuleBodyVisitor = /** @class */ (function () {
    function ModuleBodyVisitor() {
    }
    ModuleBodyVisitor.prototype.visitChildren = function (moduleBodyCtx) {
        if (!moduleBodyCtx) {
            return;
        }
        var moduleBody = {
            imports: null,
            assignmentList: null,
            constantList: null
        };
        if (moduleBodyCtx.children) {
            for (var _i = 0, _a = moduleBodyCtx.children; _i < _a.length; _i++) {
                var childCtx = _a[_i];
                switch (antlrUtils_1.ruleName(childCtx, moduleBodyCtx)) {
                    case 'imports': {
                        moduleBody.imports = childCtx.accept(new imports_1.ImportsVisitor());
                        break;
                    }
                    case 'assignmentList': {
                        var _b = childCtx.accept(new assignmentList_1.AssignmentListVisitor()), assignmentList = _b.assignmentList, constantList = _b.constantList;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        return moduleBody;
    };
    return ModuleBodyVisitor;
}());
exports.ModuleBodyVisitor = ModuleBodyVisitor;
