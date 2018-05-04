import { findVariable } from "./find-variable"

/**
 * Get the value of a given node if it's a literal or a template literal.
 * @param {Node} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is an Identifier node and this scope was given, this checks the variable of the identifier, and returns the value of it if the variable is a constant.
 * @returns {string|null} The value of the node, or `null`.
 */
export function getStringIfConstant(node, initialScope = null) {
    if (!node) {
        return null
    }

    switch (node.type) {
        case "Literal":
            if (node.regex) {
                return `/${node.regex.pattern}/${node.regex.flags}`
            }
            return String(node.value)

        case "TemplateLiteral":
            if (node.expressions.length === 0) {
                const value = node.quasis[0].value
                if (typeof value.cooked === "string") {
                    return value.cooked
                }
            }
            break

        case "Identifier":
            if (initialScope != null) {
                const variable = findVariable(initialScope, node)
                const def = variable && variable.defs[0]
                if (def != null && def.parent.kind === "const") {
                    return getStringIfConstant(def.node.init)
                }
            }
            break

        // no default
    }

    return null
}
