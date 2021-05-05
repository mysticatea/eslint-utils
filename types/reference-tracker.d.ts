export const READ: unique symbol;
export const CALL: unique symbol;
export const CONSTRUCT: unique symbol;
export const ESM: unique symbol;
/**
 * The reference tracker.
 */
export class ReferenceTracker {
    /**
     * Initialize this tracker.
     * @param {Scope.Scope} globalScope The global scope.
     * @param {object} [options] The options.
     * @param {"legacy"|"strict"} [options.mode="strict"] The mode to determine the ImportDeclaration's behavior for CJS modules.
     * @param {string[]} [options.globalObjectNames=["global","globalThis","self","window"]] The variable names for Global Object.
     */
    constructor(globalScope: Scope.Scope, { mode, globalObjectNames, }?: {
        mode?: "legacy" | "strict";
        globalObjectNames?: string[];
    });
    variableStack: any[];
    globalScope: Scope.Scope;
    mode: "strict" | "legacy";
    globalObjectNames: string[];
    /**
     * Iterate the references of global variables.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    iterateGlobalReferences(traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references of CommonJS modules.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    iterateCjsReferences(traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references of ES modules.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    iterateEsmReferences(traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references for a given variable.
     * @param {Scope.Variable} variable The variable to iterate that references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @param {boolean} shouldReport = The flag to report those references.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    _iterateVariableReferences(variable: Scope.Variable, path: string[], traceMap: object, shouldReport: boolean): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references for a given AST node.
     * @param rootNode The AST node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    _iteratePropertyReferences(rootNode: any, path: string[], traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references for a given Pattern node.
     * @param {Rule.Node} patternNode The Pattern node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    _iterateLhsReferences(patternNode: Rule.Node, path: string[], traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
    /**
     * Iterate the references for a given ModuleSpecifier node.
     * @param {Rule.Node} specifierNode The ModuleSpecifier node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    _iterateImportReferences(specifierNode: Rule.Node, path: string[], traceMap: object): IterableIterator<{
        node: Node;
        path: string[];
        type: symbol;
        info: any;
    }>;
}
export namespace ReferenceTracker {
    export { READ };
    export { CALL };
    export { CONSTRUCT };
    export { ESM };
}
import { Scope } from "eslint";
import { Rule } from "eslint";
