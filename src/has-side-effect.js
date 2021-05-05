import { Rule, SourceCode } from "eslint"
import evk from "eslint-visitor-keys"

const typeConversionBinaryOps = Object.freeze(
    new Set([
        "==",
        "!=",
        "<",
        "<=",
        ">",
        ">=",
        "<<",
        ">>",
        ">>>",
        "+",
        "-",
        "*",
        "/",
        "%",
        "|",
        "^",
        "&",
        "in",
    ])
)
const typeConversionUnaryOps = Object.freeze(new Set(["-", "+", "!", "~"]))

/**
 * Check whether the given value is an ASTNode or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an ASTNode.
 */
function isNode(x) {
    return x !== null && typeof x === "object" && typeof x.type === "string"
}

const visitor = Object.freeze(
    Object.assign(Object.create(null), {
        $visit(node, options, visitorKeys) {
            const { type } = node

            if (typeof this[type] === "function") {
                return this[type](node, options, visitorKeys)
            }

            return this.$visitChildren(node, options, visitorKeys)
        },

        $visitChildren(node, options, visitorKeys) {
            const { type } = node

            for (const key of visitorKeys[type] || evk.getKeys(node)) {
                const value = node[key]

                if (Array.isArray(value)) {
                    for (const element of value) {
                        if (
                            isNode(element) &&
                            this.$visit(element, options, visitorKeys)
                        ) {
                            return true
                        }
                    }
                } else if (
                    isNode(value) &&
                    this.$visit(value, options, visitorKeys)
                ) {
                    return true
                }
            }

            return false
        },

        ArrowFunctionExpression() {
            return false
        },
        AssignmentExpression() {
            return true
        },
        AwaitExpression() {
            return true
        },
        BinaryExpression(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                typeConversionBinaryOps.has(node.operator) &&
                (node.left.type !== "Literal" || node.right.type !== "Literal")
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        CallExpression() {
            return true
        },
        FunctionExpression() {
            return false
        },
        ImportExpression() {
            return true
        },
        MemberExpression(node, options, visitorKeys) {
            if (options.considerGetters) {
                return true
            }
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.property.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        MethodDefinition(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.key.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        NewExpression() {
            return true
        },
        Property(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.key.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        UnaryExpression(node, options, visitorKeys) {
            if (node.operator === "delete") {
                return true
            }
            if (
                options.considerImplicitTypeConversion &&
                typeConversionUnaryOps.has(node.operator) &&
                node.argument.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        UpdateExpression() {
            return true
        },
        YieldExpression() {
            return true
        },
    })
)

/**
 * Check whether a given node has any side effect or not.
 * @param {Rule.Node} node The node to get.
 * @param {SourceCode} sourceCode The source code object.
 * @param {object} [options] The option object.
 * @param {boolean} [options.considerGetters=false] If `true` then it considers member accesses as the node which has side effects.
 * @param {boolean} [options.considerImplicitTypeConversion=false] If `true` then it considers implicit type conversion as the node which has side effects.
 * @param {object} [options.visitorKeys=evk.KEYS] The keys to traverse nodes. Use `context.getSourceCode().visitorKeys`.
 * @returns {boolean} `true` if the node has a certain side effect.
 */
export function hasSideEffect(
    node,
    sourceCode,
    { considerGetters = false, considerImplicitTypeConversion = false } = {}
) {
    return visitor.$visit(
        node,
        { considerGetters, considerImplicitTypeConversion },
        sourceCode.visitorKeys || evk.KEYS
    )
}
