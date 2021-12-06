import assert from "assert"
import eslint from "eslint"
import { getInnermostScope } from "../src/index.js"

describe("The 'getInnermostScope' function", () => {
    let i = 0
    for (const { code, parserOptions, selectNode, selectScope } of [
        {
            code: "let a = 0",
            parserOptions: {},
            selectNode: (node) => node,
            selectScope: (scope) => scope,
        },
        {
            code: "let a = 0",
            parserOptions: { ecmaFeatures: { globalReturn: true } },
            selectNode: (node) => node,
            selectScope: (scope) => scope.childScopes[0],
        },
        {
            code: "let a = 0",
            parserOptions: { sourceType: "module" },
            selectNode: (node) => node,
            selectScope: (scope) => scope.childScopes[0],
        },
        {
            code: "a; { b; { c; } d; } e;",
            parserOptions: {},
            selectNode: (node) => node.body[0],
            selectScope: (scope) => scope,
        },
        {
            code: "a; { b; { c; } d; } e;",
            parserOptions: {},
            selectNode: (node) => node.body[2],
            selectScope: (scope) => scope,
        },
        {
            code: "a; { b; { c; } d; } e;",
            parserOptions: {},
            selectNode: (node) => node.body[1].body[0],
            selectScope: (scope) => scope.childScopes[0],
        },
        {
            code: "a; { b; { c; } d; } e;",
            parserOptions: {},
            selectNode: (node) => node.body[1].body[2],
            selectScope: (scope) => scope.childScopes[0],
        },
        {
            code: "a; { b; { c; } d; } e;",
            parserOptions: {},
            selectNode: (node) => node.body[1].body[1].body[0],
            selectScope: (scope) => scope.childScopes[0].childScopes[0],
        },
    ]) {
        it(`should return the innermost scope (${++i})`, () => {
            const linter = new eslint.Linter()

            let actualScope = null
            let expectedScope = null
            linter.defineRule("test", (context) => ({
                Program(node) {
                    const scope = context.getScope()
                    actualScope = getInnermostScope(scope, selectNode(node))
                    expectedScope = selectScope(scope)
                },
            }))
            linter.verify(code, {
                parserOptions: { ecmaVersion: 2018, ...parserOptions },
                rules: { test: "error" },
            })

            assert.notStrictEqual(expectedScope, null)

            // assert.strictEqual makes tooooo large diff.
            assert(actualScope === expectedScope)
        })
    }
})
