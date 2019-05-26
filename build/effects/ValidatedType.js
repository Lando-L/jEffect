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
var Option = require("./OptionType");
var ValidatedType = (function () {
    function ValidatedType() {
    }
    return ValidatedType;
}());
exports.ValidatedType = ValidatedType;
var Invalid = (function (_super) {
    __extends(Invalid, _super);
    function Invalid(errors) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        return _this;
    }
    return Invalid;
}(ValidatedType));
exports.Invalid = Invalid;
var Valid = (function (_super) {
    __extends(Valid, _super);
    function Valid(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return Valid;
}(ValidatedType));
exports.Valid = Valid;
function unit(value) {
    return new Valid(value);
}
exports.unit = unit;
function valid(value) {
    return new Valid(value);
}
exports.valid = valid;
function invalid(error) {
    return new Invalid(error);
}
exports.invalid = invalid;
function map(f) {
    return function (validated) { return (validated instanceof Valid) ? valid(f(validated.value)) : validated; };
}
exports.map = map;
function forEach(f) {
    return function (validated) {
        if (validated instanceof Valid)
            f(validated.value);
    };
}
exports.forEach = forEach;
function apply(f) {
    return function (validated) {
        if (f instanceof Valid && validated instanceof Valid)
            return valid(f.value(validated.value));
        else if (f instanceof Valid && validated instanceof Invalid)
            return validated;
        else if (f instanceof Invalid && validated instanceof Valid)
            return f.errors;
        else
            return invalid(f.errors.concat(validated.errors));
    };
}
exports.apply = apply;
function bind(f) {
    return function (validated) { return (validated instanceof Valid) ? f(validated.value) : validated; };
}
exports.bind = bind;
function fold(f) {
    return function (state) { return function (validated) { return (validated instanceof Valid) ? f(validated.value) : state; }; };
}
exports.fold = fold;
function filter(f) {
    return function (onFailure) {
        return function (validated) {
            if (validated instanceof Valid)
                return (f(validated.value)) ? validated : invalid([onFailure]);
            else
                return validated;
        };
    };
}
exports.filter = filter;
function isValid(validated) {
    return validated instanceof Valid;
}
exports.isValid = isValid;
function isInvalid(validated) {
    return validated instanceof Invalid;
}
exports.isInvalid = isInvalid;
function toString(validated) {
    return (validated instanceof Valid) ? "Valid(" + validated.value + ")" : "Invalid(" + validated.errors + ")";
}
exports.toString = toString;
function toOption(validated) {
    return (validated instanceof Valid) ? Option.unit(validated.value) : Option.None;
}
exports.toOption = toOption;
//# sourceMappingURL=ValidatedType.js.map