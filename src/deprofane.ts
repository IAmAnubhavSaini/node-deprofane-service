import words from "../data/profane-words";

/**
 * Generates a string containing as many asterisks as the length of the string passed as input.
 * @param str {string} The value is not used; `.length` value is used
 * @returns {string} a string containing asterisks/stars
 * @example 1
 * "what" => "****"
 */
export function nStars(str: string): string {
    return Array(str.length).fill("*").join("");
}

/**
 * Replaces a word in in string:accumulated to asterisks.
 *
 * @param accumulated {string}
 * @param word {string}
 * @returns {string}
 */
export function wordToStarsReducer(accumulated: string, word: string): string {
    return accumulated.replace(new RegExp(word, "ig"), nStars(word));
}

export function deprofane(input: string): string {
    return words.reduce(wordToStarsReducer, input);
}

export default deprofane;
