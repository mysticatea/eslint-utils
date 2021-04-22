import assert from "assert"
import eslint from "eslint"
import semver from "semver"
import { getFunctionHeadLocation } from "../src/"

describe("The 'getFunctionHeadLocation' function", () => {
    const expectedResults = Object.assign(
        {
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
            "({ foo: () => {} })": [11, 13],
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
        },
        semver.gte(eslint.CLIEngine.version, "7.0.0")
            ? {
                  "class A { #foo() {} }": [10, 14],
                  "class A { *#foo() {} }": [10, 15],
                  "class A { async #foo() {} }": [10, 20],
                  "class A { get #foo() {} }": [10, 18],
                  "class A { set #foo(a) {} }": [10, 18],
                  "class A { static #foo() {} }": [10, 21],
                  "class A { static *#foo() {} }": [10, 22],
                  "class A { static async #foo() {} }": [10, 27],
                  "class A { static get #foo() {} }": [10, 25],
                  "class A { static set #foo(a) {} }": [10, 25],
                  "class A { foo = function() {} }": [10, 24],
                  "class A { foo = () => {} }": [19, 21],
                  "class A { foo = function*() {} }": [10, 25],
                  "class A { foo = async function() {} }": [10, 30],
                  "class A { ['foo'] = function() {} }": [10, 28],
                  "class A { ['foo'] = () => {} }": [23, 25],
                  "class A { ['foo'] = function*() {} }": [10, 29],
                  "class A { ['foo'] = async function() {} }": [10, 34],
                  "class A { [foo] = function() {} }": [10, 26],
                  "class A { [foo] = () => {} }": [21, 23],
                  "class A { [foo] = function*() {} }": [10, 27],
                  "class A { [foo] = async function() {} }": [10, 32],
                  "class A { static foo = function() {} }": [10, 31],
                  "class A { static foo = () => {} }": [26, 28],
                  "class A { static foo = function*() {} }": [10, 32],
                  "class A { static foo = async function() {} }": [10, 37],
                  "class A { #foo = function() {} }": [10, 25],
                  "class A { #foo = () => {} }": [20, 22],
                  "class A { #foo = function*() {} }": [10, 26],
                  "class A { #foo = async function() {} }": [10, 31],
                  "class A { static #foo = function() {} }": [10, 32],
                  "class A { static #foo = () => {} }": [27, 29],
                  "class A { static #foo = function*() {} }": [10, 33],
                  "class A { static #foo = async function() {} }": [10, 38],
              }
            : {}
    )

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
            const messages = linter.verify(
                key,
                {
                    rules: { test: "error" },
                    parserOptions: {
                        ecmaVersion: semver.gte(
                            eslint.CLIEngine.version,
                            "7.0.0"
                        )
                            ? 2022
                            : 2018,
                    },
                },
                "test.js",
                true
            )

            assert.strictEqual(
                messages.length,
                0,
                messages[0] && messages[0].message
            )
            assert.deepStrictEqual(actualLoc, expectedLoc)
        })
    }
})
