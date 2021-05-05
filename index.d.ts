import * as ESLint from "eslint";

/**
 * Find the variable of a given name.
 * @param initialScope The scope to start finding.
 * @param nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
 * @returns The found variable or null.
 */
export declare function findVariable(
  initialScope: ESLint.Scope.Scope,
  nameOrNode: string | ESLint.Rule.Node
): ESLint.Scope.Variable | null;
