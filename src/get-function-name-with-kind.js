import { getPropertyName } from "./get-property-name"

/**
 * Get the name and kind of the given function node.
 * @param {ASTNode} node - The function node to get.
 * @returns {string} The name and kind of the function node.
 */
export function getFunctionNameWithKind(node) {
    const parent = node.parent
    const tokens = []
    const isFieldDefinition =
        parent.type === "MethodDefinition" ||
        parent.type === "PropertyDefinition"
    let privateName = null
    if (isFieldDefinition) {
        if (parent.key.type === "PrivateIdentifier") {
            privateName = `#${parent.key.name}`
            tokens.push("private")
        }
        if (parent.static) {
            tokens.push("static")
        }
    }
    if (node.async) {
        tokens.push("async")
    }
    if (node.generator) {
        tokens.push("generator")
    }

    if (node.type === "ArrowFunctionExpression") {
        tokens.push("arrow", "function")
    } else if (parent.type === "Property" || isFieldDefinition) {
        if (parent.kind === "constructor") {
            return "constructor"
        }
        if (parent.kind === "get") {
            tokens.push("getter")
        } else if (parent.kind === "set") {
            tokens.push("setter")
        } else {
            tokens.push("method")
        }
    } else {
        tokens.push("function")
    }

    if (node.id) {
        tokens.push(`'${node.id.name}'`)
    } else {
        const name = privateName || getPropertyName(parent)

        if (name) {
            tokens.push(`'${name}'`)
        }
    }

    if (node.type === "ArrowFunctionExpression") {
        if (
            parent.type === "VariableDeclarator" &&
            parent.id &&
            parent.id.type === "Identifier"
        ) {
            tokens.push(`'${parent.id.name}'`)
        }
        if (
            parent.type === "AssignmentExpression" &&
            parent.left &&
            parent.left.type === "Identifier"
        ) {
            tokens.push(`'${parent.left.name}'`)
        }
    }

    return tokens.join(" ")
}
