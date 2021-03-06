import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { fillRow, IFormatConfig, IIe } from '../format/xlsx';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { IParameter } from '../visitors/parameter';
import { AsnType } from './asnType';
import { IConstantAndModule } from './base';
import { IParameterMapping } from './definedType';
import { NamedType } from './namedType';

export class Sequence extends AsnType {
  public items: NamedType[];

  constructor(items: NamedType[]) {
    super();

    this.items = items;
  }

  public setConstraint(constraint: ConstraintSpec): Sequence {
    if (!isEmpty(constraint)) {
      log.warn(`Sequence could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(asn1Pool: IModules, moduleName?: string, parameterList: IParameter[] = []): Sequence {
    this.items.forEach((item) => {
      item.expand(asn1Pool, this.getModuleNameToPass(moduleName), parameterList);
    });
    return this;
  }

  public depthMax(): number {
    let depthMax = 0;
    this.items.forEach((item) => {
      depthMax = Math.max(depthMax, item.depthMax() + 1);
    });
    return depthMax;
  }

  public replaceParameters(parameterMapping: IParameterMapping[]): void {
    this.items.forEach((item) => {
      item.replaceParameters(parameterMapping);
    });
  }

  public toString(): string {
    if (!this.items.length) {
      return 'SEQUENCE {}';
    }
    const itemString = [];
    this.items.forEach((item, index) => {
      const comma = index < this.items.length - 1 ? ',' : '';
      const tag = item.tag;
      const tagString = tag ? `    ${tag}` : '';
      itemString.push(`${this.indent(item.toString())}${comma}${tagString}`);
    });
    return [
      'SEQUENCE {',
      itemString.join('\n'),
      '}',
    ].join('\n');
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number,
                       constants: IConstantAndModule[], formatConfig: IFormatConfig,
                       depth: number = 0): [number, number] {
    ieElem.type = 'SEQUENCE';
    [row, col] = fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
    this.items.forEach((item) => {
      [row, col] = item.fillWorksheet({}, ws, row, col, depthMax, constants, formatConfig, depth + 1);
    });
    return [row, col];
  }
}
