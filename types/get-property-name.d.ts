/**
 * Get the property name from a MemberExpression node or a Property node.
 * @param {Rule.Node} node The node to get.
 * @param {Scope.Scope} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
 * @returns {string|null} The property name of the node.
 */
export function getPropertyName(node: Rule.Node, initialScope?: Scope.Scope): string | null;
import { Rule } from "eslint";
import { Scope } from "eslint";
