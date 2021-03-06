import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

import { log } from '../../utils/logging';
import { getLogWithAsn1 } from '../utils';

import { IntersectionsContext } from '../ASN_3gppParser';
import { ASN_3gppVisitor } from '../ASN_3gppVisitor';
import { IConstraint } from './elements';
import { IntersectionElementsVisitor } from './intersectionElements';

/**
 * ANTLR4 grammar
 * ```
 * intersections : (intersectionElements) (intersectionMark intersectionElements)*
 * ```
 */
export class IntersectionsVisitor extends AbstractParseTreeVisitor<IConstraint>
                                  implements ASN_3gppVisitor<IConstraint> {
  public defaultResult(): IConstraint {
    return undefined;
  }

  public visitChildren(intersectionsCtx: IntersectionsContext): IConstraint {
    const childCtxes = intersectionsCtx.children;
    let intersections: IConstraint;
    if (childCtxes.length === 1) {
      intersections = childCtxes[0].accept(new IntersectionElementsVisitor());
    } else if (childCtxes.length > 1) {
      // TODO
      log.warn(getLogWithAsn1(intersectionsCtx, 'Multiple IntersectionElements\'s not supported:'));
    }
    return intersections;
  }
}
