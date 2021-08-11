import assert from "assert"
import dotProp from "dot-prop"
import eslint from "eslint"
import { isParenthesized } from "../src/"

describe("The 'isParenthesized' function", () => {
    for (const { code, expected, sourceType, ecmaVersion } of [
        {
            code: "777",
            expected: {
                "body.0": false,
                "body.0.expression": false,
            },
        },
        {
            code: "(777)",
            expected: {
                "body.0": false,
                "body.0.expression": true,
            },
        },
        {
            code: "(777 + 223)",
            expected: {
                "body.0": false,
                "body.0.expression": true,
                "body.0.expression.left": false,
                "body.0.expression.right": false,
            },
        },
        {
            code: "(777) + 223",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.left": true,
                "body.0.expression.right": false,
            },
        },
        {
            code: "((777) + 223)",
            expected: {
                "body.0": false,
                "body.0.expression": true,
                "body.0.expression.left": true,
                "body.0.expression.right": false,
            },
        },
        {
            code: "f()",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": false,
            },
        },
        {
            code: "(f())",
            expected: {
                "body.0": false,
                "body.0.expression": true,
                "body.0.expression.arguments.0": false,
            },
        },
        {
            code: "f(a)",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": false,
            },
        },
        {
            code: "f((a))",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": true,
            },
        },
        {
            code: "f(a,b)",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": false,
                "body.0.expression.arguments.1": false,
            },
        },
        {
            code: "f((a),b)",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": true,
                "body.0.expression.arguments.1": false,
            },
        },
        {
            code: "f(a,(b))",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": false,
                "body.0.expression.arguments.1": true,
            },
        },
        {
            code: "new f(a)",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": false,
            },
        },
        {
            code: "new f((a))",
            expected: {
                "body.0": false,
                "body.0.expression": false,
                "body.0.expression.arguments.0": true,
            },
        },
        {
            code: "do f(); while (a)",
            expected: {
                "body.0": false,
                "body.0.test": false,
                "body.0.body": false,
                "body.0.body.expression": false,
            },
        },
        {
            code: "do (f()); while ((a))",
            expected: {
                "body.0": false,
                "body.0.test": true,
                "body.0.body": false,
                "body.0.body.expression": true,
            },
        },
        {
            code: "if (a) b()",
            expected: {
                "body.0": false,
                "body.0.test": false,
                "body.0.consequent": false,
                "body.0.consequent.expression": false,
            },
        },
        {
            code: "if ((a)) (b())",
            expected: {
                "body.0": false,
                "body.0.test": true,
                "body.0.consequent": false,
                "body.0.consequent.expression": true,
            },
        },
        {
            code: "while (a) b()",
            expected: {
                "body.0": false,
                "body.0.test": false,
                "body.0.body": false,
                "body.0.body.expression": false,
            },
        },
        {
            code: "while ((a)) (b())",
            expected: {
                "body.0": false,
                "body.0.test": true,
                "body.0.body": false,
                "body.0.body.expression": true,
            },
        },
        {
            code: "switch (a) {}",
            expected: {
                "body.0": false,
                "body.0.discriminant": false,
            },
        },
        {
            code: "switch ((a)) {}",
            expected: {
                "body.0": false,
                "body.0.discriminant": true,
            },
        },
        {
            code: "with (a) {}",
            expected: {
                "body.0": false,
                "body.0.object": false,
            },
        },
        {
            code: "with ((a)) {}",
            expected: {
                "body.0": false,
                "body.0.object": true,
            },
        },
        {
            code: "try {} catch (a) {}",
            expected: {
                "body.0.handler.param": false,
            },
        },
        {
            code: "import('./index.js')",
            expected: {
                "body.0.expression.source": false,
            },
            sourceType: "module",
            ecmaVersion: 2022,
        },
    ]) {
        describe(`on the code \`${code}\``, () => {
            for (const key of Object.keys(expected)) {
                it(`should return ${expected[key]} at "${key}"`, () => {
                    const linter = new eslint.Linter()

                    let actual = null
                    linter.defineRule("test", (context) => ({
                        Program(node) {
                            actual = isParenthesized(
                                dotProp.get(node, key),
                                context.getSourceCode(),
                            )
                        },
                    }))
                    const messages = linter.verify(code, {
                        env: { es6: true },
                        parserOptions: {
                            ecmaVersion: ecmaVersion ? ecmaVersion : 2018,
                            sourceType,
                        },
                        rules: { test: "error" },
                    })

                    assert.strictEqual(
                        messages.length,
                        0,
                        messages[0] && messages[0].message,
                    )
                    assert.strictEqual(actual, expected[key])
                })
            }
        })
    }

    for (const { code, expected } of [
        {
            code: "777",
            expected: {
                "body.0": false,
                "body.0.expression": false,
            },
        },
        {
            code: "(777)",
            expected: {
                "body.0": false,
                "body.0.expression": false,
            },
        },
        {
            code: "((777))",
            expected: {
                "body.0": false,
                "body.0.expression": true,
            },
        },
        {
            code: "if (a) ;",
            expected: {
                "body.0": false,
                "body.0.test": false,
            },
        },
        {
            code: "if ((a)) ;",
            expected: {
                "body.0": false,
                "body.0.test": false,
            },
        },
        {
            code: "if (((a))) ;",
            expected: {
                "body.0": false,
                "body.0.test": true,
            },
        },
    ]) {
        describe(`on the code \`${code}\` and 2 times`, () => {
            for (const key of Object.keys(expected)) {
                it(`should return ${expected[key]} at "${key}"`, () => {
                    const linter = new eslint.Linter()

                    let actual = null
                    linter.defineRule("test", (context) => ({
                        Program(node) {
                            actual = isParenthesized(
                                2,
                                dotProp.get(node, key),
                                context.getSourceCode(),
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
                        messages[0] && messages[0].message,
                    )
                    assert.strictEqual(actual, expected[key])
                })
            }
        })
    }
})
