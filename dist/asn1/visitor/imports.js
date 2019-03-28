"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var symbolsImported_1 = require("./symbolsImported");
var ImportsVisitor = /** @class */ (function () {
    function ImportsVisitor() {
    }
    ImportsVisitor.prototype.visitChildren = function (importsCtx) {
        var imports = null;
        if (importsCtx.children) {
            for (var _i = 0, _a = importsCtx.children; _i < _a.length; _i++) {
                var childCtx = _a[_i];
                if (antlrUtils_1.ruleName(childCtx) === 'symbolsImported') {
                    imports = childCtx.accept(new symbolsImported_1.SymbolsImportedVisitor());
                }
            }
        }
        return imports;
    };
    return ImportsVisitor;
}());
exports.ImportsVisitor = ImportsVisitor;
