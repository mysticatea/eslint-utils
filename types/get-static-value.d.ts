/**
 * Get the value of a given node if it's a static value.
 * @param {Rule.Node} node The node to get.
 * @param {Scope.Scope} [initialScope] The scope to start finding variable. Optional. If this scope was given, this tries to resolve identifier references which are in the given node as much as possible.
 * @returns {{value:any}|{value:undefined,optional?:true}|null} The static value of the node, or `null`.
 */
export function getStaticValue(node: Rule.Node, initialScope?: Scope.Scope): {
    value: any;
} | {
    value: undefined;
    optional?: true;
} | null;
import { Rule } from "eslint";
import { Scope } from "eslint";
