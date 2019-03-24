export function ruleName(ctx: any, parentCtx: any): string {
  if (!ctx.ruleIndex) {
    return null;
  }
  return parentCtx.parser.ruleNames[ctx.ruleIndex];
}
