"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var moduleBody_1 = require("./moduleBody");
var ModuleDefinitionVisitor = /** @class */ (function () {
    function ModuleDefinitionVisitor() {
    }
    ModuleDefinitionVisitor.prototype.visitChildren = function (moduleDefinitionCtx) {
        if (!moduleDefinitionCtx) {
            return;
        }
        if (moduleDefinitionCtx.children) {
            var moduleName = moduleDefinitionCtx.children[0].getText();
            for (var _i = 0, _a = moduleDefinitionCtx.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (antlrUtils_1.matchesRule(child, moduleDefinitionCtx, 'moduleBody')) {
                    var moduleBody = child.accept(new moduleBody_1.ModuleBodyVisitor());
                    return { moduleName: moduleName, moduleBody: moduleBody };
                }
            }
        }
    };
    return ModuleDefinitionVisitor;
}());
exports.ModuleDefinitionVisitor = ModuleDefinitionVisitor;
