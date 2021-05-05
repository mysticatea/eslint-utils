/**
 * Check whether a given node has any side effect or not.
 * @param {Rule.Node} node The node to get.
 * @param {SourceCode} sourceCode The source code object.
 * @param {object} [options] The option object.
 * @param {boolean} [options.considerGetters=false] If `true` then it considers member accesses as the node which has side effects.
 * @param {boolean} [options.considerImplicitTypeConversion=false] If `true` then it considers implicit type conversion as the node which has side effects.
 * @param {object} [options.visitorKeys=evk.KEYS] The keys to traverse nodes. Use `context.getSourceCode().visitorKeys`.
 * @returns {boolean} `true` if the node has a certain side effect.
 */
export function hasSideEffect(node: Rule.Node, sourceCode: SourceCode, { considerGetters, considerImplicitTypeConversion }?: {
    considerGetters?: boolean;
    considerImplicitTypeConversion?: boolean;
    visitorKeys?: object;
}): boolean;
import { Rule } from "eslint";
import { SourceCode } from "eslint";
