/**
 * Creates the negate function of the given function.
 * @param {function(Token):boolean} f - The function to negate.
 * @returns {function(Token):boolean} Negated function.
 */
function negate(f) {
    return (token) => !f(token)
}

/**
 * Checks if the given token is a PunctuatorToken with the given value
 * @param {Token} token - The token to check.
 * @param {string} value - The value to check.
 * @returns {boolean} `true` if the token is a PunctuatorToken with the given value.
 */
function isPunctuatorTokenWithValue(token, value) {
    return token.type === "Punctuator" && token.value === value
}

/**
 * Checks if the given token is an arrow token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an arrow token.
 */
export function isArrowToken(token) {
    return isPunctuatorTokenWithValue(token, "=>")
}

/**
 * Checks if the given token is a comma token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
export function isCommaToken(token) {
    return isPunctuatorTokenWithValue(token, ",")
}

/**
 * Checks if the given token is a semicolon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
export function isSemicolonToken(token) {
    return isPunctuatorTokenWithValue(token, ";")
}

/**
 * Checks if the given token is a colon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a colon token.
 */
export function isColonToken(token) {
    return isPunctuatorTokenWithValue(token, ":")
}

/**
 * Checks if the given token is an opening parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening parenthesis token.
 */
export function isOpeningParenToken(token) {
    return isPunctuatorTokenWithValue(token, "(")
}

/**
 * Checks if the given token is a closing parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing parenthesis token.
 */
export function isClosingParenToken(token) {
    return isPunctuatorTokenWithValue(token, ")")
}

/**
 * Checks if the given token is an opening square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening square bracket token.
 */
export function isOpeningBracketToken(token) {
    return isPunctuatorTokenWithValue(token, "[")
}

/**
 * Checks if the given token is a closing square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing square bracket token.
 */
export function isClosingBracketToken(token) {
    return isPunctuatorTokenWithValue(token, "]")
}

/**
 * Checks if the given token is an opening brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening brace token.
 */
export function isOpeningBraceToken(token) {
    return isPunctuatorTokenWithValue(token, "{")
}

/**
 * Checks if the given token is a closing brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing brace token.
 */
export function isClosingBraceToken(token) {
    return isPunctuatorTokenWithValue(token, "}")
}

/**
 * Checks if the given token is a comment token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
export function isCommentToken(token) {
    return ["Block", "Line", "Shebang"].includes(token.type)
}

/**
 * Checks if the given token is a `=` token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a `=` token.
 */
export function isEqToken(token) {
    return isPunctuatorTokenWithValue(token, "=")
}

/**
 * Checks if the given token is a dot token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a dot token.
 */
export function isDotToken(token) {
    return isPunctuatorTokenWithValue(token, ".")
}

/**
 * Checks if the given token is a `?.` token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a `?.` token.
 */
export function isQuestionDotToken(token) {
    return isPunctuatorTokenWithValue(token, "?.")
}

/**
 * Checks if the given token is a keyword token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a keyword token.
 */
export function isKeywordToken(token) {
    return token.type === "Keyword"
}

/**
 * Determines whether two adjacent tokens are on the same line.
 * @param {Object} left The left token object.
 * @param {Object} right The right token object.
 * @returns {boolean} Whether or not the tokens are on the same line.
 */
export function isTokenOnSameLine(left, right) {
    return left.loc.end.line === right.loc.start.line
}

export const isNotArrowToken = negate(isArrowToken)
export const isNotCommaToken = negate(isCommaToken)
export const isNotSemicolonToken = negate(isSemicolonToken)
export const isNotColonToken = negate(isColonToken)
export const isNotOpeningParenToken = negate(isOpeningParenToken)
export const isNotClosingParenToken = negate(isClosingParenToken)
export const isNotOpeningBracketToken = negate(isOpeningBracketToken)
export const isNotClosingBracketToken = negate(isClosingBracketToken)
export const isNotOpeningBraceToken = negate(isOpeningBraceToken)
export const isNotClosingBraceToken = negate(isClosingBraceToken)
export const isNotCommentToken = negate(isCommentToken)
