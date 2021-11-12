/**
 * Gets next location when the result is not out of bound, otherwise returns null.
 * @param {SourceCode} sourceCode The sourceCode
 * @param {{line: number, column: number}} location The location
 * @returns {{line: number, column: number} | null} Next location
 */
export function getNextLocation(sourceCode, { line, column }) {
    if (column < sourceCode.lines[line - 1].length) {
        return { line, column: column + 1 }
    }

    if (line < sourceCode.lines.length) {
        return { line: line + 1, column: 0 }
    }

    return null
}
