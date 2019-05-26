"use strict";
exports.__esModule = true;
function pipe() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return function (x) { return functions.reduce(function (acc, func) { return func(acc); }, x); };
}
exports.pipe = pipe;
function compose() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return function (x) { return functions.reduceRight(function (acc, func) { return func(acc); }, x); };
}
exports.compose = compose;
//# sourceMappingURL=composition.js.map