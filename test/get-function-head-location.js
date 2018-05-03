import assert from "assert"
import eslint from "eslint"
import { getFunctionHeadLocation } from "../src/get-function-head-location"

describe("The 'getFunctionHeadLocation' function", () => {
    const expectedResults = {
        "function foo() {}": [0, 12],
        "(function foo() {})": [1, 13],
        "(function() {})": [1, 9],
        "function* foo() {}": [0, 13],
        "(function* foo() {})": [1, 14],
        "(function*() {})": [1, 10],
        "() => {}": [3, 5],
        "async () => {}": [9, 11],
        "({ foo: function foo() {} })": [3, 20],
        "({ foo: function() {} })": [3, 16],
        "({ ['foo']: function() {} })": [3, 20],
        "({ [foo]: function() {} })": [3, 18],
        "({ foo() {} })": [3, 6],
        "({ foo: function* foo() {} })": [3, 21],
        "({ foo: function*() {} })": [3, 17],
        "({ ['foo']: function*() {} })": [3, 21],
        "({ [foo]: function*() {} })": [3, 19],
        "({ *foo() {} })": [3, 7],
        "({ foo: async function foo() {} })": [3, 26],
        "({ foo: async function() {} })": [3, 22],
        "({ ['foo']: async function() {} })": [3, 26],
        "({ [foo]: async function() {} })": [3, 24],
        "({ async foo() {} })": [3, 12],
        "({ get foo() {} })": [3, 10],
        "({ set foo(a) {} })": [3, 10],
        "class A { constructor() {} }": [10, 21],
        "class A { foo() {} }": [10, 13],
        "class A { *foo() {} }": [10, 14],
        "class A { async foo() {} }": [10, 19],
        "class A { ['foo']() {} }": [10, 17],
        "class A { *['foo']() {} }": [10, 18],
        "class A { async ['foo']() {} }": [10, 23],
        "class A { [foo]() {} }": [10, 15],
        "class A { *[foo]() {} }": [10, 16],
        "class A { async [foo]() {} }": [10, 21],
        "class A { get foo() {} }": [10, 17],
        "class A { set foo(a) {} }": [10, 17],
        "class A { static foo() {} }": [10, 20],
        "class A { static *foo() {} }": [10, 21],
        "class A { static async foo() {} }": [10, 26],
        "class A { static get foo() {} }": [10, 24],
        "class A { static set foo(a) {} }": [10, 24],
    }

    for (const key of Object.keys(expectedResults)) {
        const expectedLoc = {
            start: {
                line: 1,
                column: expectedResults[key][0],
            },
            end: {
                line: 1,
                column: expectedResults[key][1],
            },
        }

        it(`should return "${JSON.stringify(
            expectedLoc
        )}" for "${key}".`, () => {
            const linter = new eslint.Linter()

            let actualLoc = null
            linter.defineRule("test", context => ({
                ":function"(node) {
                    actualLoc = getFunctionHeadLocation(
                        node,
                        context.getSourceCode()
                    )
                },
            }))
            linter.verify(
                key,
                {
                    rules: { test: "error" },
                    parserOptions: { ecmaVersion: 2018 },
                },
                "test.js",
                true
            )

            assert.deepStrictEqual(actualLoc, expectedLoc)
        })
    }
})
