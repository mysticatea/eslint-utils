/**
 * Get the location of the given function node for reporting.
 * @param {Rule.Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {string} The location of the function node for reporting.
 */
export function getFunctionHeadLocation(node: Rule.Node, sourceCode: SourceCode): string;
import { Rule } from "eslint";
import { SourceCode } from "eslint";
