import assert from "assert"
import eslint from "eslint"
import { getStringIfConstant } from "../src/"

describe("The 'getStringIfConstant' function", () => {
    for (const { code, expected } of [
        { code: "true", expected: "true" },
        { code: "false", expected: "false" },
        { code: "0x100", expected: "256" },
        { code: "3.14e+2", expected: "314" },
        { code: '"test"', expected: "test" },
        { code: "'abc'", expected: "abc" },
        { code: "`abc`", expected: "abc" },
        { code: "null", expected: "null" },
        { code: "/a/", expected: "/a/" },
        { code: "/a/g", expected: "/a/g" },
        { code: "id", expected: null },
        { code: "tag`foo`", expected: null },
        { code: "`aaa${id}bbb`", expected: null }, //eslint-disable-line no-template-curly-in-string
        { code: "1 + 2", expected: "3" },
        { code: "'a' + 'b'", expected: "ab" },
    ]) {
        it(`should return ${JSON.stringify(expected)} from ${code}`, () => {
            const linter = new eslint.Linter()

            let actual = null
            linter.defineRule("test", () => ({
                "Program > ExpressionStatement > *"(node) {
                    actual = getStringIfConstant(node)
                },
            }))
            linter.verify(code, {
                parserOptions: { ecmaVersion: 2018 },
                rules: { test: "error" },
            })

            assert.strictEqual(actual, expected)
        })
    }

    describe("with the 2nd argument 'initialScope',", () => {
        for (const { code, expected } of [
            { code: "id", expected: null },
            { code: "const id = 'abc'; id", expected: "abc" },
            { code: "let id = 'abc'; id", expected: null },
            { code: "var id = 'abc'; id", expected: null },
            { code: "const id = otherId; id", expected: null },
        ]) {
            it(`should return ${JSON.stringify(expected)} from ${code}`, () => {
                const linter = new eslint.Linter()

                let actual = null
                linter.defineRule("test", context => ({
                    "Program > ExpressionStatement > *"(node) {
                        actual = getStringIfConstant(node, context.getScope())
                    },
                }))
                linter.verify(code, {
                    parserOptions: { ecmaVersion: 2018 },
                    rules: { test: "error" },
                })

                assert.strictEqual(actual, expected)
            })
        }
    })
})
