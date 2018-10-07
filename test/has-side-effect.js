import assert from "assert"
import eslint from "eslint"
import dp from "dot-prop"
import { hasSideEffect } from "../src/"

describe("The 'hasSideEffect' function", () => {
    for (const { code, key = "body.0.expression", options, expected } of [
        {
            code: "777",
            options: undefined,
            expected: false,
        },
        {
            code: "foo",
            options: undefined,
            expected: false,
        },
        {
            code: "a = 0",
            options: undefined,
            expected: true,
        },
        {
            code: "async function f() { await g }",
            key: "body.0.body.body.0.expression",
            options: undefined,
            expected: true,
        },
        {
            code: "a + b",
            options: undefined,
            expected: false,
        },
        {
            code: "a + b",
            options: { considerImplicitTypeConversion: true },
            expected: true,
        },
        {
            code: "1 + 2",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "f()",
            options: undefined,
            expected: true,
        },
        {
            code: "a + f()",
            options: undefined,
            expected: true,
        },
        {
            code: "obj.a",
            options: undefined,
            expected: false,
        },
        {
            code: "obj.a",
            options: { considerGetters: true },
            expected: true,
        },
        {
            code: "obj[a]",
            options: undefined,
            expected: false,
        },
        {
            code: "obj[a]",
            options: { considerGetters: true },
            expected: true,
        },
        {
            code: "obj[a]",
            options: { considerImplicitTypeConversion: true },
            expected: true,
        },
        {
            code: "obj[0]",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "obj['@@abc']",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "(class { f() { a++ } })",
            options: undefined,
            expected: false,
        },
        {
            code: "(class { f() { a++ } })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "(class { [f]() { a++ } })",
            options: undefined,
            expected: false,
        },
        {
            code: "(class { [f]() { a++ } })",
            options: { considerImplicitTypeConversion: true },
            expected: true,
        },
        {
            code: "(class { [0]() { a++ } })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "(class { ['@@']() { a++ } })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "new C()",
            options: undefined,
            expected: true,
        },
        {
            code: "({ key: 1 })",
            options: undefined,
            expected: false,
        },
        {
            code: "({ key: 1 })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "({ [key]: 1 })",
            options: undefined,
            expected: false,
        },
        {
            code: "({ [key]: 1 })",
            options: { considerImplicitTypeConversion: true },
            expected: true,
        },
        {
            code: "({ [0]: 1 })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "({ ['@@']: 1 })",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "+1",
            options: undefined,
            expected: false,
        },
        {
            code: "+1",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "-1",
            options: undefined,
            expected: false,
        },
        {
            code: "-1",
            options: { considerImplicitTypeConversion: true },
            expected: false,
        },
        {
            code: "+a",
            options: undefined,
            expected: false,
        },
        {
            code: "+a",
            options: { considerImplicitTypeConversion: true },
            expected: true,
        },
        {
            code: "delete obj.a",
            options: undefined,
            expected: true,
        },
        {
            code: "++a",
            options: undefined,
            expected: true,
        },
        {
            code: "function* g() { yield 1 }",
            key: "body.0.body.body.0.expression",
            options: undefined,
            expected: true,
        },
        {
            code: "(a, b, c)",
            options: undefined,
            expected: false,
        },
        {
            code: "(a, b, ++c)",
            options: undefined,
            expected: true,
        },

        // Skip the definition body.
        {
            code: "(function f(a) { a++ })",
            options: undefined,
            expected: false,
        },
        {
            code: "((a) => { a++ })",
            options: undefined,
            expected: false,
        },
        {
            code: "((a) => a++)",
            options: undefined,
            expected: false,
        },
    ]) {
        it(`should return ${expected} on the code \`${code}\` and the options \`${JSON.stringify(
            options
        )}\``, () => {
            const linter = new eslint.Linter()

            let actual = null
            linter.defineRule("test", context => ({
                Program(node) {
                    actual = hasSideEffect(
                        dp.get(node, key),
                        context.getSourceCode(),
                        options
                    )
                },
            }))
            const messages = linter.verify(code, {
                env: { es6: true },
                parserOptions: { ecmaVersion: 2018 },
                rules: { test: "error" },
            })

            assert.strictEqual(
                messages.length,
                0,
                messages[0] && messages[0].message
            )
            assert.strictEqual(actual, expected)
        })
    }
})
