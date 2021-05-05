/**
 * Get the value of a given node if it's a literal or a template literal.
 * @param {Rule.Node} node The node to get.
 * @param {Scope.Scope} [initialScope] The scope to start finding variable. Optional. If the node is an Identifier node and this scope was given, this checks the variable of the identifier, and returns the value of it if the variable is a constant.
 * @returns {string|null} The value of the node, or `null`.
 */
export function getStringIfConstant(node: Rule.Node, initialScope?: Scope.Scope): string | null;
import { Rule } from "eslint";
import { Scope } from "eslint";
