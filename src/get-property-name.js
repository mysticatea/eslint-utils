import { Scope, Rule } from "eslint"
import { getStringIfConstant } from "./get-string-if-constant"

/**
 * Get the property name from a MemberExpression node or a Property node.
 * @param {Rule.Node} node The node to get.
 * @param {Scope.Scope} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
 * @returns {string|null} The property name of the node.
 */
export function getPropertyName(node, initialScope) {
    switch (node.type) {
        case "MemberExpression":
            if (node.computed) {
                return getStringIfConstant(node.property, initialScope)
            }
            return node.property.name

        case "Property":
        case "MethodDefinition":
            if (node.computed) {
                return getStringIfConstant(node.key, initialScope)
            }
            if (node.key.type === "Literal") {
                return String(node.key.value)
            }
            return node.key.name

        // no default
    }

    return null
}
