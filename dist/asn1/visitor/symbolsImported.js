"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var SymbolsImportedVisitor = /** @class */ (function () {
    function SymbolsImportedVisitor() {
    }
    SymbolsImportedVisitor.prototype.visitChildren = function (symbolsImportedCtx) {
        var imports = {};
        for (var _i = 0, _a = symbolsImportedCtx.children; _i < _a.length; _i++) {
            var symbolsFromModuleListCtx = _a[_i];
            for (var _b = 0, _c = symbolsFromModuleListCtx.children; _b < _c.length; _b++) {
                var symbolsFromModuleCtx = _c[_b];
                var symbolListCtx = symbolsFromModuleCtx.children[0];
                var symbolList = symbolListCtx.children.map(function (symbolCtx) {
                    if (antlrUtils_1.ruleName(symbolCtx) === 'symbol') {
                        return symbolCtx.getText();
                    }
                }).filter(function (symbol) {
                    return symbol;
                });
                var moduleName = symbolsFromModuleCtx.children[2].getText();
                imports[moduleName] = symbolList;
            }
        }
        return imports;
    };
    return SymbolsImportedVisitor;
}());
exports.SymbolsImportedVisitor = SymbolsImportedVisitor;
