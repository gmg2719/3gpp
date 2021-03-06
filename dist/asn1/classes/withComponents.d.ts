import { IFormatConfig, IIe } from '../format/xlsx';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { Base, IConstantAndModule } from './base';
import { ComponentPresence } from './componentPresence';
import { IParameterMapping } from './definedType';
import { ExtensionMarker } from './extensionMarker';
export declare class WithComponents extends Base {
    components: Array<ExtensionMarker | ComponentPresence>;
    constructor(components: Array<ExtensionMarker | ComponentPresence>);
    setConstraint(constraint: ConstraintSpec): WithComponents;
    expand(asn1Pool: IModules, moduleName?: string): never;
    depthMax(): never;
    replaceParameters(paramterMapping: IParameterMapping[]): void;
    toString(): string;
    fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: IConstantAndModule[], formatConfig: IFormatConfig, depth?: number): never;
}
