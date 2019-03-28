"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var moduleBody_1 = require("./moduleBody");
// moduleDefinition :  IDENTIFIER (L_BRACE (IDENTIFIER L_PARAN NUMBER R_PARAN)* R_BRACE)?
//      DEFINITIONS_LITERAL
//      tagDefault
//      extensionDefault
//      ASSIGN_OP
//       BEGIN_LITERAL
//      moduleBody
//       END_LITERAL
var ModuleDefinitionVisitor = /** @class */ (function () {
    function ModuleDefinitionVisitor() {
    }
    ModuleDefinitionVisitor.prototype.visitChildren = function (moduleDefinitionCtx) {
        var moduleName = moduleDefinitionCtx.children[0].getText();
        for (var _i = 0, _a = moduleDefinitionCtx.children; _i < _a.length; _i++) {
            var childCtx = _a[_i];
            if (antlrUtils_1.ruleName(childCtx) === 'moduleBody') {
                var moduleBody = childCtx.accept(new moduleBody_1.ModuleBodyVisitor());
                return { moduleName: moduleName, moduleBody: moduleBody };
            }
        }
        throw Error("ASN.1 is badly written\n" + moduleDefinitionCtx.getText());
    };
    return ModuleDefinitionVisitor;
}());
exports.ModuleDefinitionVisitor = ModuleDefinitionVisitor;
