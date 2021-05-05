import { Scope, Rule, SourceCode, AST } from "eslint"
import { isArrowToken, isOpeningParenToken } from "./token-predicate"

/**
 * Get the `(` token of the given function node.
 * @param {Rule.Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {AST.Token} `(` token.
 */
function getOpeningParenOfParams(node, sourceCode) {
    return node.id
        ? sourceCode.getTokenAfter(node.id, isOpeningParenToken)
        : sourceCode.getFirstToken(node, isOpeningParenToken)
}

/**
 * Get the location of the given function node for reporting.
 * @param {Rule.Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {string} The location of the function node for reporting.
 */
export function getFunctionHeadLocation(node, sourceCode) {
    const parent = node.parent
    let start = null
    let end = null

    if (node.type === "ArrowFunctionExpression") {
        const arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken)

        start = arrowToken.loc.start
        end = arrowToken.loc.end
    } else if (
        parent.type === "Property" ||
        parent.type === "MethodDefinition"
    ) {
        start = parent.loc.start
        end = getOpeningParenOfParams(node, sourceCode).loc.start
    } else {
        start = node.loc.start
        end = getOpeningParenOfParams(node, sourceCode).loc.start
    }

    return {
        start: Object.assign({}, start),
        end: Object.assign({}, end),
    }
}
