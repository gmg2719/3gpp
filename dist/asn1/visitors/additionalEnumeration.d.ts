import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { AdditionalEnumerationContext } from '../ASN_3gppParser';
import { ASN_3gppVisitor } from '../ASN_3gppVisitor';
import { EnumerationItem } from './enumerationItem';
/**
 * ANTLR4 grammar
 * ```
 * additionalEnumeration : enumeration
 * ```
 */
export declare class AdditionalEnumerationVisitor extends AbstractParseTreeVisitor<EnumerationItem[]> implements ASN_3gppVisitor<EnumerationItem[]> {
    defaultResult(): EnumerationItem[];
    visitChildren(additionalEnumerationCtx: AdditionalEnumerationContext): EnumerationItem[];
}
