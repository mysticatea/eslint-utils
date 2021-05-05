/**
 * Check whether a given node is parenthesized or not.
 * @param {number} times The number of parantheses.
 * @param {Rule.Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {boolean} `true` if the node is parenthesized the given times.
 */
/**
 * Check whether a given node is parenthesized or not.
 * @param {Rule.Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {boolean} `true` if the node is parenthesized.
 */
export function isParenthesized(timesOrNode: any, nodeOrSourceCode: any, optionalSourceCode: any): boolean;
