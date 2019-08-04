"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function expand(msgIe, asn1Pool /* TODO */) {
    var _a;
    var msgIeClone = lodash_1.cloneDeep(msgIe);
    var expandQueue = [[msgIeClone.definition, asn1Pool, undefined, msgIeClone.definition.parameterList]];
    while (expandQueue.length) {
        var item = expandQueue.shift();
        (_a = item[0]).expand.apply(_a, item.slice(1).concat([expandQueue]));
    }
    return msgIeClone;
}
exports.expand = expand;
