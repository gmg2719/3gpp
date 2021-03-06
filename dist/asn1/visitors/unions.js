"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const ASN_3gppParser_1 = require("../ASN_3gppParser");
const intersections_1 = require("./intersections");
/**
 * ANTLR4 grammar
 * ```
 * unions :   (intersections) (unionMark intersections)*
 * ```
 */
class UnionsVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    defaultResult() {
        return [];
    }
    visitChildren(unionsCtx) {
        const unions = [];
        const { children } = unionsCtx;
        children.forEach((childCtx) => {
            if (childCtx instanceof ASN_3gppParser_1.IntersectionsContext) {
                unions.push(childCtx.accept(new intersections_1.IntersectionsVisitor()));
            }
        });
        return unions;
    }
}
exports.UnionsVisitor = UnionsVisitor;
