"use strict";
exports.__esModule = true;
var ModuleDefinitionVisitor = /** @class */ (function () {
    function ModuleDefinitionVisitor(modules) {
        this.modules = modules;
    }
    ModuleDefinitionVisitor.prototype.visitChildren = function (moduleDefinitionCtx) {
        if (!moduleDefinitionCtx) {
            return;
        }
        if (moduleDefinitionCtx.children) {
            var moduleName = moduleDefinitionCtx.children[0].getText();
            this.modules[moduleName] = {};
        }
    };
    return ModuleDefinitionVisitor;
}());
exports.ModuleDefinitionVisitor = ModuleDefinitionVisitor;
