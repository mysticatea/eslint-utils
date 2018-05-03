/**
 * Get the value of a given node if it's a literal or a template literal.
 * @param {Node} node - A node to get.
 * @returns {string|null} The value of the node, or `null`.
 */
export function getStringIfConstant(node) {
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

        // no default
    }

    return null
}
