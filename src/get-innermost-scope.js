/**
 * Get the innermost scope which contains a given location.
 * @param {Scope} initialScope The initial scope to search.
 * @param {Node} node The location to search.
 * @returns {Scope} The innermost scope.
 */
export function getInnermostScope(initialScope, node) {
    const location = node.range[0]

    let scope = initialScope
    let found = false
    do {
        found = false
        for (const childScope of scope.childScopes) {
            const range = childScope.block.range

            if (range[0] <= location && location < range[1]) {
                scope = childScope
                found = true
                break
            }
        }
    } while (found)

    return scope
}
