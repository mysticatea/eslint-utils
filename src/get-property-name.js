import { getStringIfConstant } from "./get-string-if-constant"

/**
 * Get the property name from a MemberExpression node or a Property node.
 * @param {Node} node The node to get.
 * @returns {string|null} The property name of the node.
 */
export function getPropertyName(node) {
    switch (node.type) {
        case "MemberExpression":
            if (node.computed) {
                return getStringIfConstant(node.property)
            }
            return node.property.name

        case "Property":
        case "MethodDefinition":
            if (node.computed) {
                return getStringIfConstant(node.key)
            }
            if (node.key.type === "Literal") {
                return String(node.key.value)
            }
            return node.key.name

        // no default
    }

    return null
}
