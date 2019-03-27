"use strict";
exports.__esModule = true;
var antlrUtils_1 = require("../antlrUtils");
var assignmentList_1 = require("./assignmentList");
var imports_1 = require("./imports");
var ModuleBodyVisitor = /** @class */ (function () {
    function ModuleBodyVisitor() {
    }
    ModuleBodyVisitor.prototype.visitChildren = function (moduleBodyCtx) {
        var moduleBody = {
            imports: null,
            types: null,
            constants: null
        };
        for (var _i = 0, _a = moduleBodyCtx.children; _i < _a.length; _i++) {
            var childCtx = _a[_i];
            switch (antlrUtils_1.ruleName(childCtx, moduleBodyCtx)) {
                case 'imports': {
                    moduleBody.imports = childCtx.accept(new imports_1.ImportsVisitor());
                    break;
                }
                case 'assignmentList': {
                    var _b = childCtx.accept(new assignmentList_1.AssignmentListVisitor()), types = _b.types, constants = _b.constants;
                    moduleBody.types = types;
                    moduleBody.constants = constants;
                    break;
                }
                case 'exports': {
                    // TODO
                    break;
                }
                default: {
                    throw Error("ASN.1 contains unsupported expression\n" + moduleBodyCtx.getText());
                }
            }
        }
        return moduleBody;
    };
    return ModuleBodyVisitor;
}());
exports.ModuleBodyVisitor = ModuleBodyVisitor;
