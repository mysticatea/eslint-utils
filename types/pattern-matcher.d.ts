/**
 * The class to find patterns as considering escape sequences.
 */
export class PatternMatcher {
    /**
     * Initialize this matcher.
     * @param {RegExp} pattern The pattern to match.
     * @param {{escaped:boolean}} options The options.
     */
    constructor(pattern: RegExp, { escaped }?: {
        escaped: boolean;
    });
    /**
     * Find the pattern in a given string.
     * @param {string} str The string to find.
     * @returns {IterableIterator<RegExpExecArray>} The iterator which iterate the matched information.
     */
    execAll(str: string): IterableIterator<RegExpExecArray>;
    /**
     * Check whether the pattern is found in a given string.
     * @param {string} str The string to check.
     * @returns {boolean} `true` if the pattern was found in the string.
     */
    test(str: string): boolean;
    /**
     * Replace a given string.
     * @param {string} str The string to be replaced.
     * @param {(string|((...strs:string[])=>string))} replacer The string or function to replace. This is the same as the 2nd argument of `String.prototype.replace`.
     * @returns {string} The replaced string.
     */
    [Symbol.replace](str: string, replacer: string | ((...strs: string[]) => string)): string;
}
