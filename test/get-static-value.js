import assert from "assert"
import eslint from "eslint"
import { getStaticValue } from "../src/"

describe("The 'getStaticValue' function", () => {
    for (const { code, expected, noScope = false } of [
        { code: "[]", expected: { value: [] } },
        { code: "[1, 2, 3]", expected: { value: [1, 2, 3] } },
        { code: "[,, 3]", expected: { value: [, , 3] } }, //eslint-disable-line no-sparse-arrays
        { code: "[1, ...[2, 3]]", expected: { value: [1, 2, 3] } },
        { code: "[0, a]", expected: null },
        { code: "[0, ...a]", expected: null },
        { code: "a = 1 + 2", expected: { value: 3 } },
        { code: "a += 1 + 2", expected: null },
        { code: "a in obj", expected: null },
        { code: "obj instanceof Object", expected: null },
        { code: "1 == '1'", expected: { value: true } },
        { code: "1 != '1'", expected: { value: false } },
        { code: "1 === '1'", expected: { value: false } },
        { code: "1 !== '1'", expected: { value: true } },
        { code: "1 < '1'", expected: { value: false } },
        { code: "1 <= '1'", expected: { value: true } },
        { code: "1 > '1'", expected: { value: false } },
        { code: "1 >= '1'", expected: { value: true } },
        { code: "1 << '1'", expected: { value: 2 } },
        { code: "1 >> '1'", expected: { value: 0 } },
        { code: "1 >>> '1'", expected: { value: 0 } },
        { code: "1 + '1'", expected: { value: "11" } },
        { code: "1 + 2", expected: { value: 3 } },
        { code: "1 - 2", expected: { value: -1 } },
        { code: "1 * 2", expected: { value: 2 } },
        { code: "1 / 2", expected: { value: 0.5 } },
        { code: "1 % 2", expected: { value: 1 } },
        { code: "2 ** 2", expected: { value: 4 } },
        { code: "1 | 2", expected: { value: 3 } },
        { code: "1 ^ 15", expected: { value: 14 } },
        { code: "3 & 2", expected: { value: 2 } },
        { code: "a + 1", expected: null },
        { code: "String(7)", expected: { value: "7" } },
        { code: "Math.round(0.7)", expected: { value: 1 } },
        { code: "Math['round'](0.4)", expected: { value: 0 } },
        { code: "foo(7)", expected: null },
        { code: "obj.foo(7)", expected: null },
        { code: "Math.round(a)", expected: null },
        { code: "true ? 1 : c", expected: { value: 1 } },
        { code: "false ? b : 2", expected: { value: 2 } },
        { code: "a ? 1 : 2", expected: null },
        { code: "true ? b : 2", expected: null },
        { code: "false ? 1 : c", expected: null },
        { code: "undefined", expected: { value: undefined } },
        { code: "var undefined; undefined", expected: null },
        { code: "const undefined = 1; undefined", expected: { value: 1 } },
        { code: "const a = 2; a", expected: { value: 2 } },
        { code: "let a = 2; a", expected: null },
        { code: "const a = 2; a", expected: null, noScope: true },
        { code: "const a = { b: 7 }; a.b", expected: { value: 7 } },
        { code: "null", expected: { value: null } },
        { code: "true", expected: { value: true } },
        { code: "false", expected: { value: false } },
        { code: "1", expected: { value: 1 } },
        { code: "'hello'", expected: { value: "hello" } },
        { code: "/foo/g", expected: { value: /foo/g } },
        { code: "true && 1", expected: { value: 1 } },
        { code: "false && a", expected: { value: false } },
        { code: "true || a", expected: { value: true } },
        { code: "false || 2", expected: { value: 2 } },
        { code: "true && a", expected: null },
        { code: "false || a", expected: null },
        { code: "a && 1", expected: null },
        { code: "Symbol.iterator", expected: { value: Symbol.iterator } },
        {
            code: "Symbol['iter' + 'ator']",
            expected: { value: Symbol.iterator },
        },
        { code: "Symbol[iterator]", expected: null },
        { code: "Object.freeze", expected: { value: Object.freeze } },
        { code: "Object.xxx", expected: { value: undefined } },
        { code: "new Array(2)", expected: { value: new Array(2) } },
        { code: "new Array(len)", expected: null },
        { code: "({})", expected: { value: {} } },
        {
            code: "({a: 1, b: 2, c: 3})",
            expected: { value: { a: 1, b: 2, c: 3 } },
        },
        {
            code: "const obj = {b: 2}; ({a: 1, ...obj})",
            expected: { value: { a: 1, b: 2 } },
        },
        { code: "var obj = {b: 2}; ({a: 1, ...obj})", expected: null },
        { code: "({ get a() {} })", expected: null },
        { code: "({ a })", expected: null },
        { code: "({ a: b })", expected: null },
        { code: "({ [a]: 1 })", expected: null },
        { code: "(a, b, 3)", expected: { value: 3 } },
        { code: "(1, b)", expected: null },
        { code: "`hello`", expected: { value: "hello" } },
        { code: "const ll = 'll'; `he${ll}o`", expected: { value: "hello" } }, //eslint-disable-line no-template-curly-in-string
        { code: "String.raw`\\unicode`", expected: { value: "\\unicode" } },
        { code: "`he${a}o`", expected: null }, //eslint-disable-line no-template-curly-in-string
        { code: "x`hello`", expected: null },
        { code: "-1", expected: { value: -1 } },
        { code: "+'1'", expected: { value: 1 } },
        { code: "!0", expected: { value: true } },
        { code: "~-1", expected: { value: 0 } },
        { code: "typeof 0", expected: { value: "number" } },
        { code: "void a.b", expected: { value: undefined } },
        { code: "+a", expected: null },
        { code: "delete a.b", expected: null },
        { code: "!function(){ return true }", expected: null },
        { code: "'' + Symbol()", expected: null },
        {
            code: `const eventName = "click"
const aMap = Object.freeze({
    click: 777
})
;\`on\${eventName} : \${aMap[eventName]}\``,
            expected: { value: "onclick : 777" },
        },
    ]) {
        it(`should return ${JSON.stringify(expected)} from ${code}`, () => {
            const linter = new eslint.Linter()

            let actual = null
            linter.defineRule("test", context => ({
                ExpressionStatement(node) {
                    actual = getStaticValue(
                        node,
                        noScope ? null : context.getScope()
                    )
                },
            }))
            linter.verify(code, {
                env: { es6: true },
                parserOptions: { ecmaVersion: 2018 },
                rules: { test: "error" },
            })

            if (actual == null) {
                assert.strictEqual(actual, expected)
            } else {
                assert.deepStrictEqual(actual.value, expected.value)
            }
        })
    }
})
