import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { IFormatConfig, IIe } from '../format/xlsx';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { Base, IConstantAndModule } from './base';
import { ComponentPresence } from './componentPresence';
import { IParameterMapping } from './definedType';
import { ExtensionMarker } from './extensionMarker';

export class WithComponents extends Base {
  public components: Array<ExtensionMarker | ComponentPresence>;

  constructor(components: Array<ExtensionMarker | ComponentPresence>) {
    super();

    this.components = components;
  }

  public setConstraint(constraint: ConstraintSpec): WithComponents {
    if (!isEmpty(constraint)) {
      log.warn(`WithComponents could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(asn1Pool: IModules, moduleName?: string): never {
    throw Error(`${this.constructor.name}.expand does not need to be implemented`);
  }

  public depthMax(): never {
    throw Error('Depth of this class is not valid');
  }

  public replaceParameters(paramterMapping: IParameterMapping[]): void {
    // Do nothing
  }

  public toString(): string {
    return `{${this.components.map((component) => component.toString()).join(', ')}}`;
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number,
                       constants: IConstantAndModule[], formatConfig: IFormatConfig,
                       depth: number = 0): never {
    throw Error(`${this.constructor.name}.fillWorksheet does not need to be implemented`);
  }
}
