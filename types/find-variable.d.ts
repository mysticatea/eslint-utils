/**
 * Find the variable of a given name.
 * @param {Scope.Scope} initialScope The scope to start finding.
 * @param {string|Rule.Node} nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
 * @returns {Scope.Variable|null} The found variable or null.
 */
export function findVariable(initialScope: Scope.Scope, nameOrNode: string | Rule.Node): Scope.Variable | null;
import { Scope } from "eslint";
import { Rule } from "eslint";
