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
var Validated = require("./ValidatedType");
var OptionType = (function () {
    function OptionType() {
    }
    return OptionType;
}());
exports.OptionType = OptionType;
var None = (function (_super) {
    __extends(None, _super);
    function None() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return None;
}(OptionType));
exports.None = None;
var Some = (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return Some;
}(OptionType));
exports.Some = Some;
function unit(value) {
    return (value !== null && value !== undefined) ? new Some(value) : None;
}
exports.unit = unit;
function map(f) {
    return function (option) { return (option instanceof Some) ? unit(f(option.value)) : None; };
}
exports.map = map;
function forEach(f) {
    return function (option) {
        if (option instanceof Some)
            f(option.value);
    };
}
exports.forEach = forEach;
function apply(f) {
    return function (option) { return (f instanceof Some && option instanceof Some) ? new Some(f.value(option.value)) : None; };
}
exports.apply = apply;
function bind(f) {
    return function (option) { return (option instanceof Some) ? f(option.value) : None; };
}
exports.bind = bind;
function filter(f) {
    return function (option) {
        if (option instanceof Some)
            return (f(option.value)) ? option : None;
        else
            return None;
    };
}
exports.filter = filter;
function fold(f) {
    return function (state) { return function (option) { return (option instanceof Some) ? f(option.value) : state; }; };
}
exports.fold = fold;
function isEmpty(option) {
    return option === None;
}
exports.isEmpty = isEmpty;
function nonEmpty(option) {
    return option instanceof Some;
}
exports.nonEmpty = nonEmpty;
function toString(option) {
    return (option instanceof Some) ? "Some(" + option.value + ")" : "None";
}
exports.toString = toString;
function toValidated(onFailure) {
    return function (option) { return (option instanceof Some) ? Validated.valid(option.value) : Validated.invalid([onFailure]); };
}
exports.toValidated = toValidated;
//# sourceMappingURL=OptionType.js.map