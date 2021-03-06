import { IFormatConfig, IIe } from '../format/xlsx';
import { BuiltinValue } from '../visitors/builtinValue';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { IParameter } from '../visitors/parameter';
import { AsnType } from './asnType';
import { IConstantAndModule } from './base';
import { IParameterMapping } from './definedType';
import { NamedType } from './namedType';
export declare class SequenceOf extends AsnType {
    type: AsnType | NamedType;
    expandedType: AsnType | NamedType;
    size: BuiltinValue;
    sizeMin: BuiltinValue;
    sizeMax: BuiltinValue;
    constructor(type: AsnType | NamedType);
    setConstraint(constraint: ConstraintSpec): SequenceOf;
    expand(asn1Pool: IModules, moduleName?: string, parameterList?: IParameter[]): SequenceOf;
    depthMax(): number;
    replaceParameters(parameterMapping: IParameterMapping[]): void;
    toString(): string;
    toStringUnexpanded(): string;
    fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: IConstantAndModule[], formatConfig: IFormatConfig, depth?: number): [number, number];
}
