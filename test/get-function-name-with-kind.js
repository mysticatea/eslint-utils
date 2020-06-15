import assert from "assert"
import eslint from "eslint"
import { getFunctionNameWithKind } from "../src/"

describe("The 'getFunctionNameWithKind' function", () => {
    const expectedResults = {
        "function foo() {}": "function 'foo'",
        "(function foo() {})": "function 'foo'",
        "(function() {})": "function",
        "function* foo() {}": "generator function 'foo'",
        "(function* foo() {})": "generator function 'foo'",
        "(function*() {})": "generator function",
        "() => {}": "arrow function",
        "async () => {}": "async arrow function",
        "const foo = () => {}": "arrow function 'foo'",
        "const foo = async () => {}": "async arrow function 'foo'",
        "foo = () => {}": "arrow function 'foo'",
        "foo = async () => {}": "async arrow function 'foo'",
        "foo.bar = () => {}": "arrow function",
        "foo.bar = async () => {}": "async arrow function",
        "({ foo: function foo() {} })": "method 'foo'",
        "({ foo: function() {} })": "method 'foo'",
        "({ ['foo']: function() {} })": "method 'foo'",
        "({ [foo]: function() {} })": "method",
        "({ foo() {} })": "method 'foo'",
        "({ foo: function* foo() {} })": "generator method 'foo'",
        "({ foo: function*() {} })": "generator method 'foo'",
        "({ ['foo']: function*() {} })": "generator method 'foo'",
        "({ [foo]: function*() {} })": "generator method",
        "({ *foo() {} })": "generator method 'foo'",
        "({ foo: async function foo() {} })": "async method 'foo'",
        "({ foo: async function() {} })": "async method 'foo'",
        "({ ['foo']: async function() {} })": "async method 'foo'",
        "({ [foo]: async function() {} })": "async method",
        "({ async foo() {} })": "async method 'foo'",
        "({ get foo() {} })": "getter 'foo'",
        "({ set foo(a) {} })": "setter 'foo'",
        "class A { constructor() {} }": "constructor",
        "class A { foo() {} }": "method 'foo'",
        "class A { *foo() {} }": "generator method 'foo'",
        "class A { async foo() {} }": "async method 'foo'",
        "class A { ['foo']() {} }": "method 'foo'",
        "class A { *['foo']() {} }": "generator method 'foo'",
        "class A { async ['foo']() {} }": "async method 'foo'",
        "class A { [foo]() {} }": "method",
        "class A { *[foo]() {} }": "generator method",
        "class A { async [foo]() {} }": "async method",
        "class A { get foo() {} }": "getter 'foo'",
        "class A { set foo(a) {} }": "setter 'foo'",
        "class A { static foo() {} }": "static method 'foo'",
        "class A { static *foo() {} }": "static generator method 'foo'",
        "class A { static async foo() {} }": "static async method 'foo'",
        "class A { static get foo() {} }": "static getter 'foo'",
        "class A { static set foo(a) {} }": "static setter 'foo'",
    }

    for (const key of Object.keys(expectedResults)) {
        it(`should return "${expectedResults[key]}" for "${key}".`, () => {
            const linter = new eslint.Linter()

            let actualResult = null
            linter.defineRule("test", () => ({
                ":function"(node) {
                    actualResult = getFunctionNameWithKind(node)
                },
            }))
            linter.verify(key, {
                rules: { test: "error" },
                parserOptions: { ecmaVersion: 2018 },
            })

            assert.strictEqual(actualResult, expectedResults[key])
        })
    }
})
