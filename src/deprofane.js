"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprofane = exports.wordToStarsReducer = exports.nStars = void 0;
var profane_words_1 = __importDefault(require("../data/profane-words"));
/**
 * Generates a string containing as many asterisks as the length of the string passed as input.
 * @param str {string} The value is not used; `.length` value is used
 * @returns {string} a string containing asterisks/stars
 * @example 1
 * "what" => "****"
 */
function nStars(str) {
    return Array(str.length).fill("*").join("");
}
exports.nStars = nStars;
/**
 * Replaces a word in in string:accumulated to asterisks.
 *
 * @param accumulated {string}
 * @param word {string}
 * @returns {string}
 */
function wordToStarsReducer(accumulated, word) {
    return accumulated.replace(new RegExp(word, "ig"), nStars(word));
}
exports.wordToStarsReducer = wordToStarsReducer;
function deprofane(input) {
    return profane_words_1.default.reduce(wordToStarsReducer, input);
}
exports.deprofane = deprofane;
exports.default = deprofane;
//# sourceMappingURL=deprofane.js.map