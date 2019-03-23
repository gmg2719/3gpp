"use strict";
exports.__esModule = true;
var moduleDefinition_1 = require("./moduleDefinition");
var ModulesVisitor = /** @class */ (function () {
    function ModulesVisitor() {
    }
    ModulesVisitor.prototype.visitChildren = function (modulesCtx) {
        var modules = {};
        if (!modulesCtx) {
            return;
        }
        if (modulesCtx.children) {
            for (var _i = 0, _a = modulesCtx.children; _i < _a.length; _i++) {
                var moduleDefinitionCtx = _a[_i];
                moduleDefinitionCtx.accept(new moduleDefinition_1.ModuleDefinitionVisitor(modules));
            }
        }
        return modules;
    };
    return ModulesVisitor;
}());
exports.ModulesVisitor = ModulesVisitor;
