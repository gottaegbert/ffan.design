"use strict";
exports.__esModule = true;
exports.gePageData = void 0;
var fs_1 = require("fs");
var js_yaml_1 = require("js-yaml");
function gePageData(pageName) {
    var doc;
    try {
        doc = js_yaml_1["default"].load(fs_1["default"].readFileSync("utils/files/" + pageName + ".yml", "utf8"));
    }
    catch (e) {
        console.error(e);
    }
    return doc;
}
exports.gePageData = gePageData;
