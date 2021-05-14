import assert from "assert"
import {
    isArrowToken,
    isClosingBraceToken,
    isClosingBracketToken,
    isClosingParenToken,
    isColonToken,
    isCommaToken,
    isCommentToken,
    isNotArrowToken,
    isNotClosingBraceToken,
    isNotClosingBracketToken,
    isNotClosingParenToken,
    isNotColonToken,
    isNotCommaToken,
    isNotCommentToken,
    isNotOpeningBraceToken,
    isNotOpeningBracketToken,
    isNotOpeningParenToken,
    isNotSemicolonToken,
    isOpeningBraceToken,
    isOpeningBracketToken,
    isOpeningParenToken,
    isSemicolonToken,
} from "../src/"

describe("The predicate functions for tokens", () => {
    for (const { positive, negative, patterns } of [
        {
            positive: isArrowToken,
            negative: isNotArrowToken,
            patterns: [
                [{ type: "Punctuator", value: "=>" }, true],
                [{ type: "Punctuator", value: ">" }, false],
                [{ type: "Line", value: "=>" }, false],
            ],
        },
        {
            positive: isClosingBraceToken,
            negative: isNotClosingBraceToken,
            patterns: [
                [{ type: "Punctuator", value: "}" }, true],
                [{ type: "Punctuator", value: "{" }, false],
                [{ type: "Punctuator", value: ")" }, false],
                [{ type: "Line", value: "}" }, false],
            ],
        },
        {
            positive: isClosingBracketToken,
            negative: isNotClosingBracketToken,
            patterns: [
                [{ type: "Punctuator", value: "]" }, true],
                [{ type: "Punctuator", value: "[" }, false],
                [{ type: "Punctuator", value: ")" }, false],
                [{ type: "Line", value: "]" }, false],
            ],
        },
        {
            positive: isClosingParenToken,
            negative: isNotClosingParenToken,
            patterns: [
                [{ type: "Punctuator", value: ")" }, true],
                [{ type: "Punctuator", value: "(" }, false],
                [{ type: "Punctuator", value: "}" }, false],
                [{ type: "Line", value: ")" }, false],
            ],
        },
        {
            positive: isColonToken,
            negative: isNotColonToken,
            patterns: [
                [{ type: "Punctuator", value: ":" }, true],
                [{ type: "Punctuator", value: ";" }, false],
                [{ type: "Line", value: ":" }, false],
            ],
        },
        {
            positive: isCommaToken,
            negative: isNotCommaToken,
            patterns: [
                [{ type: "Punctuator", value: "," }, true],
                [{ type: "Punctuator", value: "." }, false],
                [{ type: "Line", value: "," }, false],
            ],
        },
        {
            positive: isCommentToken,
            negative: isNotCommentToken,
            patterns: [
                [{ type: "Line", value: "." }, true],
                [{ type: "Block", value: "." }, true],
                [{ type: "Shebang", value: "." }, true],
                [{ type: "Punctuator", value: "." }, false],
            ],
        },
        {
            positive: isOpeningBraceToken,
            negative: isNotOpeningBraceToken,
            patterns: [
                [{ type: "Punctuator", value: "{" }, true],
                [{ type: "Punctuator", value: "(" }, false],
                [{ type: "Punctuator", value: "}" }, false],
                [{ type: "Line", value: "{" }, false],
            ],
        },
        {
            positive: isOpeningBracketToken,
            negative: isNotOpeningBracketToken,
            patterns: [
                [{ type: "Punctuator", value: "[" }, true],
                [{ type: "Punctuator", value: "(" }, false],
                [{ type: "Punctuator", value: "]" }, false],
                [{ type: "Line", value: "[" }, false],
            ],
        },
        {
            positive: isOpeningParenToken,
            negative: isNotOpeningParenToken,
            patterns: [
                [{ type: "Punctuator", value: "(" }, true],
                [{ type: "Punctuator", value: "{" }, false],
                [{ type: "Punctuator", value: ")" }, false],
                [{ type: "Line", value: "(" }, false],
            ],
        },
        {
            positive: isSemicolonToken,
            negative: isNotSemicolonToken,
            patterns: [
                [{ type: "Punctuator", value: ";" }, true],
                [{ type: "Punctuator", value: ":" }, false],
                [{ type: "Line", value: ";" }, false],
            ],
        },
    ]) {
        const baseName = positive.name.slice(2)

        describe(`'is${baseName}'`, () => {
            for (const [token, expected] of patterns) {
                it(`should return ${expected} if ${JSON.stringify(
                    token,
                )} was given.`, () => {
                    assert.strictEqual(positive(token), expected)
                })
            }
        })

        describe(`'isNot${baseName}'`, () => {
            for (const [token, expected] of patterns) {
                it(`should return ${!expected} if ${JSON.stringify(
                    token,
                )} was given.`, () => {
                    assert.strictEqual(negative(token), !expected)
                })
            }
        })
    }
})
