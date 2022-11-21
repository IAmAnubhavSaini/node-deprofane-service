/**
 * Generates a string containing as many asterisks as the length of the string passed as input.
 * @param str {string} The value is not used; `.length` value is used
 * @returns {string} a string containing asterisks/stars
 * @example 1
 * "what" => "****"
 */
export declare function nStars(str: string): string;
/**
 * Replaces a word in in string:accumulated to asterisks.
 *
 * @param accumulated {string}
 * @param word {string}
 * @returns {string}
 */
export declare function wordToStarsReducer(accumulated: string, word: string): string;
export declare function deprofane(input: string): string;
export default deprofane;
//# sourceMappingURL=deprofane.d.ts.map