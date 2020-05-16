import assert from "assert"
import { PatternMatcher } from "../src/"

const NAMED_CAPTURE_GROUP_SUPPORTED = (() => {
    try {
        new RegExp("(?<a>)", "u") //eslint-disable-line no-new, prefer-regex-literals
        return true
    } catch (_error) {
        return false
    }
})()

/**
 * Create a new RegExpExecArray.
 * @param {string[]} subStrings The substrings.
 * @param {number} index The index.
 * @param {string} input The input.
 * @returns {RegExpExecArray} The created object.
 */
function newRegExpExecArray(subStrings, index, input) {
    Object.assign(subStrings, { index, input })
    if (NAMED_CAPTURE_GROUP_SUPPORTED) {
        subStrings.groups = undefined
    }
    return subStrings
}

describe("The 'PatternMatcher' class:", () => {
    describe("the constructor", () => {
        it("should throw TypeError if non-RegExp value was given.", () => {
            for (const value of [
                undefined,
                null,
                1,
                "foo",
                () => {
                    // empty
                },
                {
                    exec() {
                        // empty
                    },
                },
            ]) {
                assert.throws(
                    () => new PatternMatcher(value),
                    /^TypeError: 'pattern' should be a RegExp instance\.$/u
                )
            }
        })

        it("should throw Error if the RegExp value does not have 'g' flag.", () => {
            for (const value of [/foo/u, /bar/imu]) {
                assert.throws(
                    () => new PatternMatcher(value),
                    /^Error: 'pattern' should contains 'g' flag\.$/u
                )
            }
        })
    })

    describe("the 'execAll' method", () => {
        describe("with no options", () => {
            for (const { str, expected } of [
                { str: "", expected: [] },
                { str: "abc", expected: [] },
                { str: String.raw`\foo`, expected: [] },
                { str: String.raw`\\\foo`, expected: [] },
                { str: String.raw`\a\foo`, expected: [] },
                {
                    str: "foo",
                    expected: [newRegExpExecArray(["foo"], 0, "foo")],
                },
                {
                    str: String.raw`\\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 2, String.raw`\\foo`),
                    ],
                },
                {
                    str: String.raw`\\\\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 4, String.raw`\\\\foo`),
                    ],
                },
                {
                    str: "-foofoofooabcfoo-",
                    expected: [
                        newRegExpExecArray(["foo"], 1, "-foofoofooabcfoo-"),
                        newRegExpExecArray(["foo"], 4, "-foofoofooabcfoo-"),
                        newRegExpExecArray(["foo"], 7, "-foofoofooabcfoo-"),
                        newRegExpExecArray(["foo"], 13, "-foofoofooabcfoo-"),
                    ],
                },
                {
                    str: String.raw`-foo\foofooabcfoo-`,
                    expected: [
                        newRegExpExecArray(
                            ["foo"],
                            1,
                            String.raw`-foo\foofooabcfoo-`
                        ),
                        newRegExpExecArray(
                            ["foo"],
                            8,
                            String.raw`-foo\foofooabcfoo-`
                        ),
                        newRegExpExecArray(
                            ["foo"],
                            14,
                            String.raw`-foo\foofooabcfoo-`
                        ),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/foo/gu)
                    const actual = Array.from(matcher.execAll(str))
                    assert.deepStrictEqual(actual, expected)
                })
            }

            for (const { str, expected } of [
                {
                    str: "ab0c",
                    expected: [newRegExpExecArray(["b0", "b", "0"], 1, "ab0c")],
                },
                {
                    str: "a1b2c3",
                    expected: [
                        newRegExpExecArray(["a1", "a", "1"], 0, "a1b2c3"),
                        newRegExpExecArray(["b2", "b", "2"], 2, "a1b2c3"),
                        newRegExpExecArray(["c3", "c", "3"], 4, "a1b2c3"),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/(\w)(\d)/gu)
                    const actual = Array.from(matcher.execAll(str))
                    assert.deepStrictEqual(actual, expected)
                })
            }

            it("should iterate for two strings in parallel.", () => {
                const matcher = new PatternMatcher(/\w/gu)
                const expected1 = [
                    newRegExpExecArray(["a"], 0, "a--b-c"),
                    newRegExpExecArray(["b"], 3, "a--b-c"),
                    newRegExpExecArray(["c"], 5, "a--b-c"),
                ]
                const expected2 = [
                    newRegExpExecArray(["a"], 1, "-ab-c-"),
                    newRegExpExecArray(["b"], 2, "-ab-c-"),
                    newRegExpExecArray(["c"], 4, "-ab-c-"),
                ]
                const actual1 = []
                const actual2 = []
                const it1 = matcher.execAll("a--b-c")
                const it2 = matcher.execAll("-ab-c-")
                {
                    let ret1 = null
                    let ret2 = null
                    while (
                        ((ret1 = it1.next()),
                        (ret2 = it2.next()),
                        !ret1.done && !ret2.done)
                    ) {
                        actual1.push(ret1.value)
                        actual2.push(ret2.value)
                    }
                }

                assert.deepStrictEqual(actual1, expected1)
                assert.deepStrictEqual(actual2, expected2)
            })
        })

        describe("with 'escaped:true' option", () => {
            for (const { str, expected } of [
                {
                    str: "foo",
                    expected: [newRegExpExecArray(["foo"], 0, "foo")],
                },
                {
                    str: String.raw`\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 1, String.raw`\foo`),
                    ],
                },
                {
                    str: String.raw`\\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 2, String.raw`\\foo`),
                    ],
                },
                {
                    str: String.raw`\\\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 3, String.raw`\\\foo`),
                    ],
                },
                {
                    str: String.raw`\\\\foo`,
                    expected: [
                        newRegExpExecArray(["foo"], 4, String.raw`\\\\foo`),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/foo/gu, {
                        escaped: true,
                    })
                    const actual = Array.from(matcher.execAll(str))
                    assert.deepStrictEqual(actual, expected)
                })
            }
        })
    })

    describe("the 'test' method", () => {
        for (const { str, expected } of [
            { str: "", expected: false },
            { str: "abc", expected: false },
            { str: String.raw`\foo`, expected: false },
            { str: String.raw`\\\foo`, expected: false },
            { str: String.raw`\a\foo`, expected: false },
            { str: String.raw`-\foo\foo\fooabc\foo-`, expected: false },
            { str: "foo", expected: true },
            { str: String.raw`\\foo`, expected: true },
            { str: String.raw`\\\\foo`, expected: true },
            { str: "-foofoofooabcfoo-", expected: true },
            { str: String.raw`-foo\foofooabcfoo-`, expected: true },
        ]) {
            it(`should return ${expected} in ${JSON.stringify(str)}.`, () => {
                const matcher = new PatternMatcher(/foo/gu)
                const actual = matcher.test(str)
                assert.deepStrictEqual(actual, expected)
            })
        }
    })

    describe("the 'Symbol.replace' method", () => {
        for (const { pattern, str, replacer, expected } of [
            { str: "", replacer: "xyz", expected: "" },
            { str: "123", replacer: "xyz", expected: "123" },
            {
                str: String.raw`1\a2\b3`,
                replacer: "x",
                expected: String.raw`1\a2\b3`,
            },
            {
                str: String.raw`1a2\b3`,
                replacer: "x",
                expected: String.raw`1x2\b3`,
            },
            {
                str: String.raw`1a2b3`,
                replacer: "x",
                expected: String.raw`1x2x3`,
            },
            { str: "abc", replacer: "x", expected: "xxx" },
            { str: "abc", replacer: "$$x", expected: "$x$x$x" },
            { str: "abc", replacer: "$$&", expected: "$&$&$&" },
            { str: "abc", replacer: "$$$&", expected: "$a$b$c" },
            { str: "abc", replacer: "$&", expected: "abc" },
            { str: "abc", replacer: "$'$`", expected: "bccaab" },
            {
                str: String.raw`a\bc`,
                replacer: "$'$`",
                expected: String.raw`\bc\ba\b`,
            },
            { str: "abc", replacer: "$0", expected: "$0$0$0" },
            { str: "abc", replacer: "$1", expected: "$1$1$1" },
            {
                pattern: /a(b)/gu,
                str: "abc",
                replacer: "$1",
                expected: "bc",
            },
        ]) {
            it(`should return ${expected} in ${JSON.stringify(
                str
            )} and ${JSON.stringify(replacer)}.`, () => {
                const matcher = new PatternMatcher(pattern || /[a-c]/gu)
                const actual = str.replace(matcher, replacer)
                assert.deepStrictEqual(actual, expected)
            })
        }

        it("should pass the correct arguments to replacers.", () => {
            const matcher = new PatternMatcher(/(\w)(\d)/gu)
            const actualArgs = []
            const actual = "abc1d2efg".replace(matcher, (...args) => {
                actualArgs.push(args)
                return "x"
            })

            assert.deepStrictEqual(actualArgs, [
                ["c1", "c", "1", 2, "abc1d2efg"],
                ["d2", "d", "2", 4, "abc1d2efg"],
            ])
            assert.deepStrictEqual(actual, "abxxefg")
        })
    })
})
