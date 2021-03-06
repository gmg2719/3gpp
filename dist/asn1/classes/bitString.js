"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("../format/xlsx");
const asnType_1 = require("./asnType");
class BitString extends asnType_1.AsnType {
    setConstraint(constraint) {
        this.constraint = constraint;
        return this;
    }
    expand(asn1Pool, moduleName) {
        return this;
    }
    depthMax() {
        return 0;
    }
    replaceParameters(paramterMapping) {
        // Do nothing
    }
    toString() {
        const valueConstraint = this.size !== undefined ? `(SIZE (${this.size}))` :
            this.sizeMin !== undefined && this.sizeMax !== undefined ? `(SIZE (${this.sizeMin}..${this.sizeMax}))` : '';
        return `BIT STRING ${valueConstraint}`;
    }
    fillWorksheet(ieElem, ws, row, col, depthMax, constants, formatConfig, depth = 0) {
        ieElem.type = this.toString();
        [row, col] = xlsx_1.fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
        this.addToConstants(this.size, constants);
        this.addToConstants(this.sizeMin, constants);
        this.addToConstants(this.sizeMax, constants);
        return [row, col];
    }
}
exports.BitString = BitString;
