"use strict";
exports.__esModule = true;
var logging_1 = require("../utils/logging");
function getContextName(ctx) {
    if ('ruleIndex' in ctx) {
        return ctx.parser.ruleNames[ctx.ruleIndex];
    }
    return null;
}
exports.getContextName = getContextName;
function getLogWithAsn1(ctx, prefix, postfix, length) {
    if (prefix === void 0) { prefix = ''; }
    if (postfix === void 0) { postfix = ''; }
    if (length === void 0) { length = 80; }
    var asn1Length = length - prefix.length - postfix.length;
    return [prefix, ctx.getText().substring(0, asn1Length), postfix].join(' ').trim();
}
exports.getLogWithAsn1 = getLogWithAsn1;
function findConstantValue(constant, moduleName, asn1Pool) {
    return findReference(constant, moduleName, asn1Pool, 'constants');
}
exports.findConstantValue = findConstantValue;
function findDefinition(typeName, moduleName, asn1Pool) {
    return findReference(typeName, moduleName, asn1Pool, 'assignments');
}
exports.findDefinition = findDefinition;
function findReference(refName, moduleName, asn1Pool, key) {
    logging_1.log.warn("Look up " + key + " reference " + refName + " in module " + moduleName);
    logging_1.log.warn(Object.keys(asn1Pool));
    if (refName in asn1Pool[moduleName][key]) {
        return asn1Pool[moduleName][key][refName];
    }
    if (refName in asn1Pool[moduleName].imports) {
        var importedModuleName = asn1Pool[moduleName].imports[refName];
        var importedModule = asn1Pool[importedModuleName];
        return importedModule.assignments[refName];
    }
    throw Error("Cannot find a reference " + refName + " in a module " + moduleName);
}
