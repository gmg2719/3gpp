"use strict";
exports.__esModule = true;
function matchesRule(ctx, parentCtx, ruleName) {
    return ctx.ruleIndex && parentCtx.parser.ruleNames[ctx.ruleIndex] === ruleName;
}
exports.matchesRule = matchesRule;
