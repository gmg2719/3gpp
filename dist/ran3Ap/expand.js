"use strict";
exports.__esModule = true;
var _ = require("lodash");
var reReference = /\d+(\.\d+)+/;
/**
 * Expand references in definition of message or IE
 * @param msgIeDefinition Message or IE definition object to be expanded
 * @param definitions Collection of messages and/or IEs to be referenced
 * @param definitionsExpanded Collection of already expanded messages and/or IEs to be merged
 */
function expand(msgIeDefinition, definitions, definitionsExpanded) {
    var section = msgIeDefinition.section;
    if (section in definitionsExpanded) {
        return definitionsExpanded[msgIeDefinition.section];
    }
    var stackUnexpanded = prepareExpansionStack(msgIeDefinition, definitions, definitionsExpanded);
    expandStack(stackUnexpanded, definitionsExpanded);
    return definitionsExpanded[section];
}
exports.expand = expand;
function prepareExpansionStack(msgIeDefinition, definitions, definitionsExpanded) {
    var stackUntraversed = [{ content: msgIeDefinition, level: 0 }];
    var stackTraversed = [];
    var _loop_1 = function (i) {
        var definitionTreeNode = stackUntraversed[i];
        var level = definitionTreeNode.level;
        var indexTraversed = stackTraversed.findIndex(function (elem) {
            return elem.content.section === definitionTreeNode.content.section;
        });
        if (indexTraversed !== -1) {
            if (stackTraversed[indexTraversed].level >= level) {
                return "continue";
            }
            stackTraversed.splice(indexTraversed, 1);
        }
        stackTraversed.push(definitionTreeNode);
        definitionTreeNode.content.ies.forEach(function (ie) {
            var reference = getReference(ie['ie type and reference']);
            if (!reference || (reference in definitionsExpanded) || !(reference in definitions)) {
                return;
            }
            var indexSubIeTraversed = stackTraversed.findIndex(function (elem) { return elem.content.section === reference; });
            if (indexSubIeTraversed !== -1) {
                if (stackTraversed[indexSubIeTraversed].level >= level + 1) {
                    return;
                }
                stackTraversed.splice(indexSubIeTraversed, 1);
            }
            stackUntraversed.push({ content: definitions[reference], level: level + 1 });
        });
    };
    // Stack length may not be constant. So not using for-of
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < stackUntraversed.length; i++) {
        _loop_1(i);
    }
    return stackTraversed;
}
function expandStack(stackUnexpanded, definitionsExpanded) {
    while (stackUnexpanded.length) {
        var msgIeDefinition = _.cloneDeep(stackUnexpanded.pop().content);
        var section = msgIeDefinition.section, ies = msgIeDefinition.ies;
        // ies length may not be constant. So not using for-of
        // tslint:disable-next-line:prefer-for-of
        for (var i = ies.length - 1; i >= 0; i--) {
            var reference = getReference(ies[i]['ie type and reference']);
            if (!reference || !(reference in definitionsExpanded)) {
                continue;
            }
            var depth = ies[i].depth;
            var subIes = definitionsExpanded[reference].ies;
            ies.splice.apply(ies, [i + 1, 0].concat((_.cloneDeep(subIes))));
            for (var j = 0; j < subIes.length; j++) {
                ies[i + j + 1].depth += depth + 1;
            }
        }
        definitionsExpanded[section] = msgIeDefinition;
    }
}
function getReference(text) {
    var matchReference = text.match(reReference);
    if (!matchReference) {
        return null;
    }
    return matchReference[0];
}
