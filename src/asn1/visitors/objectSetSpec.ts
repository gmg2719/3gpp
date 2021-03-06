import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

import { log } from '../../utils/logging';

import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { AdditionalElementSetSpecContext, ObjectSetSpecContext, RootElementSetSpecContext } from '../ASN_3gppParser';
import { ASN_3gppVisitor } from '../ASN_3gppVisitor';
import { ExtensionMarker } from '../classes/extensionMarker';
import { getLogWithAsn1 } from '../utils';
import { AdditionalElementSetSpecVisitor } from './additionalElementSetSpec';
import { IConstraint } from './elements';
import { RootElementSetSpecVisitor } from './rootElementSetSpec';

type ObjectSetSpec = Array<IConstraint | ExtensionMarker>;

/**
 * ANTLR4 grammar
 * ```
 * objectSetSpec :
 *   rootElementSetSpec (COMMA ELLIPSIS (COMMA additionalElementSetSpec )?)?
 *  | ELLIPSIS (COMMA additionalElementSetSpec )?
 * ```
 */
export class ObjectSetSpecVisitor extends AbstractParseTreeVisitor<ObjectSetSpec>
                                  implements ASN_3gppVisitor<ObjectSetSpec> {
  public defaultResult(): ObjectSetSpec {
    return [];
  }

  public visitChildren(objectSetSpecCtx: ObjectSetSpecContext): ObjectSetSpec {
    const objectSetSpec: ObjectSetSpec = [];
    const { children } = objectSetSpecCtx;
    children.forEach((childCtx) => {
      if (childCtx instanceof RootElementSetSpecContext) {
        const rootElementSetSpec = childCtx.accept(new RootElementSetSpecVisitor());
        objectSetSpec.splice(objectSetSpec.length, 0, ...rootElementSetSpec);
      } else if (childCtx instanceof AdditionalElementSetSpecContext) {
        const additionalElementSetSpec = childCtx.accept(new AdditionalElementSetSpecVisitor());
        objectSetSpec.splice(objectSetSpec.length, 0, ...additionalElementSetSpec);
      } else if (childCtx instanceof TerminalNode) {
        if (childCtx.text === '...') {
          objectSetSpec.push(new ExtensionMarker());
        }
      } else {
        log.warn(new Error(getLogWithAsn1(childCtx, 'Not supported ASN.1')));
      }
    });
    return objectSetSpec;
  }
}
