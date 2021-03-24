"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var profane_words_1 = __importDefault(require("../data/profane-words"));
function deprofane(input) {
    return profane_words_1.default.reduce(function (a, c) { return a.replace(new RegExp(c, 'ig'), Array(c.length).fill('*').join('')); }, input);
}
exports.default = deprofane;
//# sourceMappingURL=deprofane.js.map