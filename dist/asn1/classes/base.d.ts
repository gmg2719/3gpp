import { IFormatConfig, IIe } from '../format/xlsx';
export declare abstract class Base {
    moduleName: string;
    abstract expand(asn1Pool: any, moduleName?: string, parameterList?: string[], expandQueue?: any[]): Base;
    abstract depthMax(): number;
    abstract toString(): string;
    abstract fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[], formatConfig: IFormatConfig, depth?: number): [number, number];
    abstract replaceParameters(parameterMapping: {
        [parameter: string]: any;
    }): void;
    protected abstract setConstraint(constraint: any): Base;
    protected indent(text: string): string;
    protected addToConstants(obj: any, constants: any[]): void;
    protected getModuleNameToPass(moduleName?: string): string;
}
