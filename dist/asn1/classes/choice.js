"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var lodash_1 = require("lodash");
var logging_1 = require("../../utils/logging");
var xlsx_1 = require("../format/xlsx");
var base_1 = require("./base");
var Choice = /** @class */ (function (_super) {
    __extends(Choice, _super);
    function Choice(choices) {
        var _this = _super.call(this) || this;
        _this.choices = choices;
        return _this;
    }
    Choice.prototype.setConstraint = function (constraint) {
        if (!lodash_1.isEmpty(constraint)) {
            logging_1.log.warn("Choice constraint " + JSON.stringify(constraint));
        }
        return this;
    };
    Choice.prototype.expand = function (asn1Pool /* TODO */, moduleName, parameterList, expandQueue) {
        var _this = this;
        if (parameterList === void 0) { parameterList = []; }
        this.choices.forEach(function (choice) {
            if (expandQueue) {
                expandQueue.push([choice, asn1Pool, _this.getModuleNameToPass(moduleName), parameterList]);
            }
            else {
                choice.expand(asn1Pool, _this.getModuleNameToPass(moduleName), parameterList, expandQueue);
            }
        });
        return this;
    };
    Choice.prototype.depthMax = function () {
        var depthMax = 0;
        this.choices.forEach(function (choice) {
            depthMax = Math.max(depthMax, choice.depthMax() + 1);
        });
        return depthMax;
    };
    Choice.prototype.replaceParameters = function (parameterMapping) {
        this.choices.forEach(function (choice) {
            choice.replaceParameters(parameterMapping);
        });
    };
    Choice.prototype.toString = function () {
        var _this = this;
        return !this.choices.length ? 'CHOICE {}' : [
            'CHOICE {',
            this.choices.map(function (choice) { return _this.indent(choice.toString()); }).join(',\n'),
            '}',
        ].join('\n');
    };
    Choice.prototype.fillWorksheet = function (ieElem, ws, row, col, depthMax, constants, formatConfig, depth) {
        if (depth === void 0) { depth = 0; }
        var _a;
        ieElem.type = 'CHOICE';
        _a = xlsx_1.fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth), row = _a[0], col = _a[1];
        this.choices.forEach(function (choice) {
            var _a;
            _a = choice.fillWorksheet({}, ws, row, col, depthMax, constants, formatConfig, depth + 1), row = _a[0], col = _a[1];
        });
        return [row, col];
    };
    return Choice;
}(base_1.Base));
exports.Choice = Choice;
