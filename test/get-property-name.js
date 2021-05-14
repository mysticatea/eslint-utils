import assert from "assert"
import eslint from "eslint"
import semver from "semver"
import { getPropertyName } from "../src/"

describe("The 'getPropertyName' function", () => {
    for (const { code, expected } of [
        { code: "a.b", expected: "b" },
        { code: "a['b']", expected: "b" },
        { code: "a[`b`]", expected: "b" },
        { code: "a[100]", expected: "100" },
        { code: "a[b]", expected: null },
        { code: "a['a' + 'b']", expected: "ab" },
        { code: "a[tag`b`]", expected: null },
        { code: "a[`${b}`]", expected: null }, //eslint-disable-line no-template-curly-in-string
        { code: "({b: 1})", expected: "b" },
        { code: "({0x10: 1})", expected: "16" },
        { code: "({'foo': 1})", expected: "foo" },
        { code: "({b() {}})", expected: "b" },
        { code: "({get b() {}})", expected: "b" },
        { code: "({['b']: 1})", expected: "b" },
        { code: "({['b']() {}})", expected: "b" },
        { code: "({[`b`]: 1})", expected: "b" },
        { code: "({[100]: 1})", expected: "100" },
        { code: "({[b]: 1})", expected: null },
        { code: "({['a' + 'b']: 1})", expected: "ab" },
        { code: "({[tag`b`]: 1})", expected: null },
        { code: "({[`${b}`]: 1})", expected: null }, //eslint-disable-line no-template-curly-in-string
        { code: "(class {b() {}})", expected: "b" },
        { code: "(class {get b() {}})", expected: "b" },
        { code: "(class {['b']() {}})", expected: "b" },
        { code: "(class {[100]() {}})", expected: "100" },
        { code: "(class {[b]() {}})", expected: null },
        { code: "(class {['a' + 'b']() {}})", expected: "ab" },
        { code: "(class {[tag`b`]() {}})", expected: null },
        { code: "(class {[`${b}`]() {}})", expected: null }, //eslint-disable-line no-template-curly-in-string
        ...(semver.gte(eslint.Linter.version, "7.0.0")
            ? [
                  { code: "(class { x })", expected: "x" },
                  { code: "(class { static x })", expected: "x" },
                  { code: "(class { #x })", expected: null },
                  { code: "(class { get #x() {} })", expected: null },
                  { code: "(class { #x() {} })", expected: null },
                  { code: "(class { static #x })", expected: null },
                  { code: "(class { static get #x() {} })", expected: null },
                  { code: "(class { static #x() {} })", expected: null },
                  {
                      code: "(class { #x; fn() {this.#x} })",
                      expected: null,
                  },
                  {
                      code: "(class { #x; fn() {this.x} })",
                      expected: "x",
                  },
              ]
            : []),
    ]) {
        it(`should return ${JSON.stringify(expected)} from ${code}`, () => {
            const linter = new eslint.Linter()

            let actual = null
            linter.defineRule("test", () => ({
                "Property,PropertyDefinition,MethodDefinition,MemberExpression"(
                    node
                ) {
                    actual = getPropertyName(node)
                },
            }))
            const messages = linter.verify(code, {
                parserOptions: {
                    ecmaVersion: semver.gte(eslint.Linter.version, "7.0.0")
                        ? 2022
                        : 2018,
                },
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
