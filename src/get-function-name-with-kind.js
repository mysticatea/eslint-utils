import { getPropertyName } from "./get-property-name.js"

/**
 * Get the name and kind of the given function node.
 * @param {ASTNode} node - The function node to get.
 * @param {SourceCode} [sourceCode] The source code object to get the code of computed property keys.
 * @returns {string} The name and kind of the function node.
 */
// eslint-disable-next-line complexity
export function getFunctionNameWithKind(node, sourceCode) {
    const parent = node.parent
    const tokens = []
    const isObjectMethod = parent.type === "Property" && parent.value === node
    const isClassMethod =
        parent.type === "MethodDefinition" && parent.value === node
    const isClassFieldMethod =
        parent.type === "PropertyDefinition" && parent.value === node

    // Modifiers.
    if (isClassMethod || isClassFieldMethod) {
        if (parent.static) {
            tokens.push("static")
        }
        if (parent.key.type === "PrivateIdentifier") {
            tokens.push("private")
        }
    }
    if (node.async) {
        tokens.push("async")
    }
    if (node.generator) {
        tokens.push("generator")
    }

    // Kinds.
    if (isObjectMethod || isClassMethod) {
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
    } else if (isClassFieldMethod) {
        tokens.push("method")
    } else {
        if (node.type === "ArrowFunctionExpression") {
            tokens.push("arrow")
        }
        tokens.push("function")
    }

    // Names.
    if (isObjectMethod || isClassMethod || isClassFieldMethod) {
        if (parent.key.type === "PrivateIdentifier") {
            tokens.push(`#${parent.key.name}`)
        } else {
            const name = getPropertyName(parent)
            if (name) {
                tokens.push(`'${name}'`)
            } else if (sourceCode) {
                const keyText = sourceCode.getText(parent.key)
                if (!keyText.includes("\n")) {
                    tokens.push(`[${keyText}]`)
                }
            }
        }
    } else if (node.id) {
        tokens.push(`'${node.id.name}'`)
    } else if (
        parent.type === "VariableDeclarator" &&
        parent.id &&
        parent.id.type === "Identifier"
    ) {
        tokens.push(`'${parent.id.name}'`)
    } else if (
        (parent.type === "AssignmentExpression" ||
            parent.type === "AssignmentPattern") &&
        parent.left &&
        parent.left.type === "Identifier"
    ) {
        tokens.push(`'${parent.left.name}'`)
    }

    return tokens.join(" ")
}
