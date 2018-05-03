import { isArrowToken, isOpeningParenToken } from "./token-predicate"

/**
 * Get the `(` token of the given function node.
 *
 * @param {Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {Token} `(` token.
 */
function getOpeningParenOfParams(node, sourceCode) {
    return node.id
        ? sourceCode.getTokenAfter(node.id, isOpeningParenToken)
        : sourceCode.getFirstToken(node, isOpeningParenToken)
}

/**
 * Get the location of the given function node for reporting.
 *
 * - `function foo() {}`
 *    ^^^^^^^^^^^^
 * - `(function foo() {})`
 *     ^^^^^^^^^^^^
 * - `(function() {})`
 *     ^^^^^^^^
 * - `function* foo() {}`
 *    ^^^^^^^^^^^^^
 * - `(function* foo() {})`
 *     ^^^^^^^^^^^^^
 * - `(function*() {})`
 *     ^^^^^^^^^
 * - `() => {}`
 *       ^^
 * - `async () => {}`
 *             ^^
 * - `({ foo: function foo() {} })`
 *       ^^^^^^^^^^^^^^^^^
 * - `({ foo: function() {} })`
 *       ^^^^^^^^^^^^^
 * - `({ ['foo']: function() {} })`
 *       ^^^^^^^^^^^^^^^^^
 * - `({ [foo]: function() {} })`
 *       ^^^^^^^^^^^^^^^
 * - `({ foo() {} })`
 *       ^^^
 * - `({ foo: function* foo() {} })`
 *       ^^^^^^^^^^^^^^^^^^
 * - `({ foo: function*() {} })`
 *       ^^^^^^^^^^^^^^
 * - `({ ['foo']: function*() {} })`
 *       ^^^^^^^^^^^^^^^^^^
 * - `({ [foo]: function*() {} })`
 *       ^^^^^^^^^^^^^^^^
 * - `({ *foo() {} })`
 *       ^^^^
 * - `({ foo: async function foo() {} })`
 *       ^^^^^^^^^^^^^^^^^^^^^^^
 * - `({ foo: async function() {} })`
 *       ^^^^^^^^^^^^^^^^^^^
 * - `({ ['foo']: async function() {} })`
 *       ^^^^^^^^^^^^^^^^^^^^^^^
 * - `({ [foo]: async function() {} })`
 *       ^^^^^^^^^^^^^^^^^^^^^
 * - `({ async foo() {} })`
 *       ^^^^^^^^^
 * - `({ get foo() {} })`
 *       ^^^^^^^
 * - `({ set foo(a) {} })`
 *       ^^^^^^^
 * - `class A { constructor() {} }`
 *              ^^^^^^^^^^^
 * - `class A { foo() {} }`
 *              ^^^
 * - `class A { *foo() {} }`
 *              ^^^^
 * - `class A { async foo() {} }`
 *              ^^^^^^^^^
 * - `class A { ['foo']() {} }`
 *              ^^^^^^^
 * - `class A { *['foo']() {} }`
 *              ^^^^^^^^
 * - `class A { async ['foo']() {} }`
 *              ^^^^^^^^^^^^^
 * - `class A { [foo]() {} }`
 *              ^^^^^
 * - `class A { *[foo]() {} }`
 *              ^^^^^^
 * - `class A { async [foo]() {} }`
 *              ^^^^^^^^^^^
 * - `class A { get foo() {} }`
 *              ^^^^^^^
 * - `class A { set foo(a) {} }`
 *              ^^^^^^^
 * - `class A { static foo() {} }`
 *              ^^^^^^^^^^
 * - `class A { static *foo() {} }`
 *              ^^^^^^^^^^^
 * - `class A { static async foo() {} }`
 *              ^^^^^^^^^^^^^^^^
 * - `class A { static get foo() {} }`
 *              ^^^^^^^^^^^^^^
 * - `class A { static set foo(a) {} }`
 *              ^^^^^^^^^^^^^^
 *
 * @param {Node} node - The function node to get.
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
