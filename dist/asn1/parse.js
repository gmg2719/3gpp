"use strict";
exports.__esModule = true;
var antlr4 = require("antlr4");
var ASNLexer_1 = require("./ASNLexer");
var ASNParser_1 = require("./ASNParser");
var modules_1 = require("./visitor/modules");
function parse(text) {
    var chars = new antlr4.InputStream(text);
    var lexer = new ASNLexer_1.ASNLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new ASNParser_1.ASNParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.modules();
    tree.accept(new modules_1.ModulesVisitor());
}
exports.parse = parse;
