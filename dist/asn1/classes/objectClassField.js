"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../../utils/logging");
const xlsx_1 = require("../format/xlsx");
const asnType_1 = require("./asnType");
class ObjectClassField extends asnType_1.AsnType {
    constructor(moduleReference, objectClassReference, fieldName) {
        super();
        this.moduleReference = moduleReference;
        this.objectClassReference = objectClassReference;
        this.fieldName = fieldName;
    }
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
        logging_1.log.warn(new Error('replaceParameters() not supported').stack);
    }
    toString() {
        const moduleReference = this.moduleReference ? `${this.moduleReference}.` : '';
        const constraint = this.constraint ? ` (${this.constraint.toString()})` : '';
        return `${moduleReference}${this.objectClassReference}.${this.fieldName}${constraint}`;
    }
    fillWorksheet(ieElem, ws, row, col, depthMax, constants, formatConfig, depth = 0) {
        ieElem.type = this.toString();
        [row, col] = xlsx_1.fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
        return [row, col];
    }
}
exports.ObjectClassField = ObjectClassField;
