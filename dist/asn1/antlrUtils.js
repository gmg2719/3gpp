"use strict";
exports.__esModule = true;
function ruleName(ctx, parentCtx) {
    if (!ctx.ruleIndex) {
        return null;
    }
    return parentCtx.parser.ruleNames[ctx.ruleIndex];
}
exports.ruleName = ruleName;
