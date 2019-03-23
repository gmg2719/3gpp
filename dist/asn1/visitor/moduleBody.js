"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var imports_1 = require("./imports");
var ModuleBodyVisitor = /** @class */ (function () {
    function ModuleBodyVisitor() {
    }
    ModuleBodyVisitor.prototype.visitChildren = function (moduleBodyCtx) {
        if (!moduleBodyCtx) {
            return;
        }
        var moduleBody = {};
        if (moduleBodyCtx.children) {
            for (var _i = 0, _a = moduleBodyCtx.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (antlrUtils_1.matchesRule(child, moduleBodyCtx, 'imports')) {
                    moduleBody.imports = child.accept(new imports_1.ImportsVisitor());
                }
                else if (antlrUtils_1.matchesRule(child, moduleBodyCtx, 'assignmentList')) {
                    moduleBody.assignmentList = {};
                }
            }
        }
        return moduleBody;
    };
    return ModuleBodyVisitor;
}());
exports.ModuleBodyVisitor = ModuleBodyVisitor;
