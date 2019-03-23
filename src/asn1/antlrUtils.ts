export function matchesRule(ctx: any, parentCtx: any, ruleName: string): boolean {
  return ctx.ruleIndex && parentCtx.parser.ruleNames[ctx.ruleIndex] === ruleName;
}
