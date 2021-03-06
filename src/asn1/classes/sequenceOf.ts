import { cloneDeep, isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { fillRow, IFormatConfig, IIe } from '../format/xlsx';
import { BuiltinValue } from '../visitors/builtinValue';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { IParameter } from '../visitors/parameter';
import { AsnType } from './asnType';
import { IConstantAndModule } from './base';
import { IParameterMapping } from './definedType';
import { NamedType } from './namedType';

export class SequenceOf extends AsnType {
  public type: AsnType | NamedType;
  public expandedType: AsnType | NamedType;
  public size: BuiltinValue;
  public sizeMin: BuiltinValue;
  public sizeMax: BuiltinValue;

  constructor(type: AsnType | NamedType) {
    super();

    this.type = type;
  }

  public setConstraint(constraint: ConstraintSpec): SequenceOf {
    this.constraint = constraint;
    return this;
  }

  public expand(asn1Pool: IModules, moduleName?: string, parameterList: IParameter[] = []): SequenceOf {
    const typeToExpand = cloneDeep(this.type).expand(asn1Pool, this.getModuleNameToPass(moduleName), parameterList);
    // This should always be true
    if (typeToExpand instanceof AsnType || typeToExpand instanceof NamedType) {
      this.expandedType = typeToExpand;
    }
    return this;
  }

  public depthMax(): number {
    if (this.expandedType) {
      return this.expandedType.depthMax() + 1;
    }
    return 0;
  }

  public replaceParameters(parameterMapping: IParameterMapping[]): void {
    this.type.replaceParameters(parameterMapping);
  }

  public toString(): string {
    const size = this.size !== null ? ` (SIZE (${this.size}))` :
      this.sizeMin !== null && this.sizeMax !== null ? ` (SIZE (${this.sizeMin}..${this.sizeMax}))` : '';
    return `SEQUENCE${size} OF ${this.expandedType ? this.expandedType.toString() : this.type.toString()}`;
  }

  public toStringUnexpanded(): string {
    const size = this.size !== null ? ` (SIZE (${this.size}))` :
      this.sizeMin !== null && this.sizeMax !== null ? ` (SIZE (${this.sizeMin}..${this.sizeMax}))` : '';
    return `SEQUENCE${size} OF ${this.type.toString()}`;
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number,
                       constants: IConstantAndModule[], formatConfig: IFormatConfig,
                       depth: number = 0): [number, number] {
    ieElem.type = this.toStringUnexpanded();
    [row, col] = fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
    this.addToConstants(this.size, constants);
    this.addToConstants(this.sizeMin, constants);
    this.addToConstants(this.sizeMax, constants);
    if (this.expandedType) {
      [row, col] = this.expandedType.fillWorksheet({ie: this.type.toString()},
        ws, row, col, depthMax, constants, formatConfig, depth + 1);
    }
    return [row, col];
  }
}
