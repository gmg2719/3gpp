import { IFormatConfig, IIe } from '../format/xlsx';
import { Base } from './base';
export declare class NamedType extends Base {
    name: string;
    type: Base;
    optional: boolean;
    default: any;
    constructor(name: string, type: any);
    setConstraint(constraint: any): NamedType;
    expand(asn1Pool: any, moduleName?: string, parameterList?: string[], expandQueue?: any[]): NamedType;
    depthMax(): number;
    replaceParameters(parameterMapping: {}): void;
    toString(): string;
    fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[], formatConfig: IFormatConfig, depth?: number): [number, number];
    private getOptionalString;
}
