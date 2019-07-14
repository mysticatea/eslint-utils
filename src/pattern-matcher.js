/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

const placeholder = /\$(?:[$&`']|[1-9][0-9]?)/gu

/** @type {WeakMap<PatternMatcher, {pattern:RegExp,escaped:boolean}>} */
const internal = new WeakMap()

/**
 * Check whether a given character is escaped or not.
 * @param {string} str The string to check.
 * @param {number} index The location of the character to check.
 * @returns {boolean} `true` if the character is escaped.
 */
function isEscaped(str, index) {
    let escaped = false
    for (let i = index - 1; i >= 0 && str.charCodeAt(i) === 0x5c; --i) {
        escaped = !escaped
    }
    return escaped
}

/**
 * Replace a given string by a given matcher.
 * @param {PatternMatcher} matcher The pattern matcher.
 * @param {string} str The string to be replaced.
 * @param {string} replacement The new substring to replace each matched part.
 * @returns {string} The replaced string.
 */
function replaceS(matcher, str, replacement) {
    const chunks = []
    let index = 0

    /** @type {RegExpExecArray} */
    let match = null

    /**
     * @param {string} key The placeholder.
     * @returns {string} The replaced string.
     */
    function replacer(key) {
        switch (key) {
            case "$$":
                return "$"
            case "$&":
                return match[0]
            case "$`":
                return str.slice(0, match.index)
            case "$'":
                return str.slice(match.index + match[0].length)
            default: {
                const i = key.slice(1)
                if (i in match) {
                    return match[i]
                }
                return key
            }
        }
    }

    for (match of matcher.execAll(str)) {
        chunks.push(str.slice(index, match.index))
        chunks.push(replacement.replace(placeholder, replacer))
        index = match.index + match[0].length
    }
    chunks.push(str.slice(index))

    return chunks.join("")
}

/**
 * Replace a given string by a given matcher.
 * @param {PatternMatcher} matcher The pattern matcher.
 * @param {string} str The string to be replaced.
 * @param {(...strs[])=>string} replace The function to replace each matched part.
 * @returns {string} The replaced string.
 */
function replaceF(matcher, str, replace) {
    const chunks = []
    let index = 0

    for (const match of matcher.execAll(str)) {
        chunks.push(str.slice(index, match.index))
        chunks.push(String(replace(...match, match.index, match.input)))
        index = match.index + match[0].length
    }
    chunks.push(str.slice(index))

    return chunks.join("")
}

/**
 * The class to find patterns as considering escape sequences.
 */
export class PatternMatcher {
    /**
     * Initialize this matcher.
     * @param {RegExp} pattern The pattern to match.
     * @param {{escaped:boolean}} options The options.
     */
    constructor(pattern, { escaped = false } = {}) {
        if (!(pattern instanceof RegExp)) {
            throw new TypeError("'pattern' should be a RegExp instance.")
        }
        if (!pattern.flags.includes("g")) {
            throw new Error("'pattern' should contains 'g' flag.")
        }

        internal.set(this, {
            pattern: new RegExp(pattern.source, pattern.flags),
            escaped: Boolean(escaped),
        })
    }

    /**
     * Find the pattern in a given string.
     * @param {string} str The string to find.
     * @returns {IterableIterator<RegExpExecArray>} The iterator which iterate the matched information.
     */
    *execAll(str) {
        const { pattern, escaped } = internal.get(this)
        let match = null
        let lastIndex = 0

        pattern.lastIndex = 0
        while ((match = pattern.exec(str)) != null) {
            if (escaped || !isEscaped(str, match.index)) {
                lastIndex = pattern.lastIndex
                yield match
                pattern.lastIndex = lastIndex
            }
        }
    }

    /**
     * Check whether the pattern is found in a given string.
     * @param {string} str The string to check.
     * @returns {boolean} `true` if the pattern was found in the string.
     */
    test(str) {
        const it = this.execAll(str)
        const ret = it.next()
        return !ret.done
    }

    /**
     * Replace a given string.
     * @param {string} str The string to be replaced.
     * @param {(string|((...strs:string[])=>string))} replacer The string or function to replace. This is the same as the 2nd argument of `String.prototype.replace`.
     * @returns {string} The replaced string.
     */
    [Symbol.replace](str, replacer) {
        return typeof replacer === "function"
            ? replaceF(this, String(str), replacer)
            : replaceS(this, String(str), String(replacer))
    }
}
