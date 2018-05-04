import assert from "assert"
import eslint from "eslint"
import { findVariable } from "../src/"

describe("The 'findVariable' function", () => {
    //eslint-disable-next-line require-jsdoc
    function getVariable(code, selector, withString = null) {
        const linter = new eslint.Linter()
        let variable = null

        linter.defineRule("test", context => ({
            [selector](node) {
                variable = findVariable(context.getScope(), withString || node)
            },
        }))
        linter.verify(code, {
            parserOptions: { ecmaVersion: 2018 },
            rules: { test: "error" },
        })

        return variable
    }

    describe("should return the variable of a given Identifier node", () => {
        it("from the same scope.", () => {
            const variable = getVariable(
                "let a; foo(a)",
                "CallExpression Identifier[name='a']"
            )
            assert.strictEqual(variable.name, "a")
        })
        it("from nested blocks.", () => {
            const variable = getVariable(
                "let a; if (b) { foo(a) }",
                "CallExpression Identifier[name='a']"
            )
            assert.strictEqual(variable.name, "a")
        })
        it("from function blocks.", () => {
            const variable = getVariable(
                "let a; function f() { foo(a) }",
                "CallExpression Identifier[name='a']"
            )
            assert.strictEqual(variable.name, "a")
        })
    })

    describe("should return the variable of a given Identifier node", () => {
        it("from the same scope.", () => {
            const variable = getVariable(
                "let a; foo(a)",
                "CallExpression Identifier[name='a']",
                "a"
            )
            assert.strictEqual(variable.name, "a")
        })
        it("from nested blocks.", () => {
            const variable = getVariable(
                "let a; if (b) { foo(a) }",
                "CallExpression Identifier[name='a']",
                "a"
            )
            assert.strictEqual(variable.name, "a")
        })
        it("from function blocks.", () => {
            const variable = getVariable(
                "let a; function f() { foo(a) }",
                "CallExpression Identifier[name='a']",
                "a"
            )
            assert.strictEqual(variable.name, "a")
        })
    })

    it("should return global variables.", () => {
        const variable = getVariable(
            "let a; function f() { foo(a) }",
            "CallExpression Identifier[name='a']",
            "Object"
        )
        assert.strictEqual(variable.name, "Object")
    })

    it("should return null if it didn't exist.", () => {
        const variable = getVariable(
            "let a; function f() { foo(a) }",
            "CallExpression Identifier[name='a']",
            "x"
        )
        assert.strictEqual(variable, null)
    })
})
