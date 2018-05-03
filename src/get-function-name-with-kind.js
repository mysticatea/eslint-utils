import { getPropertyName } from "./get-property-name"

/**
 * Get the name and kind of the given function node.
 *
 * - `function foo() {}`  .................... `function 'foo'`
 * - `(function foo() {})`  .................. `function 'foo'`
 * - `(function() {})`  ...................... `function`
 * - `function* foo() {}`  ................... `generator function 'foo'`
 * - `(function* foo() {})`  ................. `generator function 'foo'`
 * - `(function*() {})`  ..................... `generator function`
 * - `() => {}`  ............................. `arrow function`
 * - `async () => {}`  ....................... `async arrow function`
 * - `({ foo: function foo() {} })`  ......... `method 'foo'`
 * - `({ foo: function() {} })`  ............. `method 'foo'`
 * - `({ ['foo']: function() {} })`  ......... `method 'foo'`
 * - `({ [foo]: function() {} })`  ........... `method`
 * - `({ foo() {} })`  ....................... `method 'foo'`
 * - `({ foo: function* foo() {} })`  ........ `generator method 'foo'`
 * - `({ foo: function*() {} })`  ............ `generator method 'foo'`
 * - `({ ['foo']: function*() {} })`  ........ `generator method 'foo'`
 * - `({ [foo]: function*() {} })`  .......... `generator method`
 * - `({ *foo() {} })`  ...................... `generator method 'foo'`
 * - `({ foo: async function foo() {} })`  ... `async method 'foo'`
 * - `({ foo: async function() {} })`  ....... `async method 'foo'`
 * - `({ ['foo']: async function() {} })`  ... `async method 'foo'`
 * - `({ [foo]: async function() {} })`  ..... `async method`
 * - `({ async foo() {} })`  ................. `async method 'foo'`
 * - `({ get foo() {} })`  ................... `getter 'foo'`
 * - `({ set foo(a) {} })`  .................. `setter 'foo'`
 * - `class A { constructor() {} }`  ......... `constructor`
 * - `class A { foo() {} }`  ................. `method 'foo'`
 * - `class A { *foo() {} }`  ................ `generator method 'foo'`
 * - `class A { async foo() {} }`  ........... `async method 'foo'`
 * - `class A { ['foo']() {} }`  ............. `method 'foo'`
 * - `class A { *['foo']() {} }`  ............ `generator method 'foo'`
 * - `class A { async ['foo']() {} }`  ....... `async method 'foo'`
 * - `class A { [foo]() {} }`  ............... `method`
 * - `class A { *[foo]() {} }`  .............. `generator method`
 * - `class A { async [foo]() {} }`  ......... `async method`
 * - `class A { get foo() {} }`  ............. `getter 'foo'`
 * - `class A { set foo(a) {} }`  ............ `setter 'foo'`
 * - `class A { static foo() {} }`  .......... `static method 'foo'`
 * - `class A { static *foo() {} }`  ......... `static generator method 'foo'`
 * - `class A { static async foo() {} }`  .... `static async method 'foo'`
 * - `class A { static get foo() {} }`  ...... `static getter 'foo'`
 * - `class A { static set foo(a) {} }`  ..... `static setter 'foo'`
 *
 * @param {ASTNode} node - The function node to get.
 * @returns {string} The name and kind of the function node.
 */
export function getFunctionNameWithKind(node) {
    const parent = node.parent
    const tokens = []

    if (parent.type === "MethodDefinition" && parent.static) {
        tokens.push("static")
    }
    if (node.async) {
        tokens.push("async")
    }
    if (node.generator) {
        tokens.push("generator")
    }

    if (node.type === "ArrowFunctionExpression") {
        tokens.push("arrow", "function")
    } else if (
        parent.type === "Property" ||
        parent.type === "MethodDefinition"
    ) {
        if (parent.kind === "constructor") {
            return "constructor"
        }
        if (parent.kind === "get") {
            tokens.push("getter")
        } else if (parent.kind === "set") {
            tokens.push("setter")
        } else {
            tokens.push("method")
        }
    } else {
        tokens.push("function")
    }

    if (node.id) {
        tokens.push(`'${node.id.name}'`)
    } else {
        const name = getPropertyName(parent)

        if (name) {
            tokens.push(`'${name}'`)
        }
    }

    return tokens.join(" ")
}
