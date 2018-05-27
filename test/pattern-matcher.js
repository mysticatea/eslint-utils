import assert from "assert"
import { PatternMatcher } from "../src/"

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
                assert.throws(() => new PatternMatcher(value), TypeError)
            }
        })

        it("should throw Error if the RegExp value does not have 'g' flag.", () => {
            for (const value of [/foo/, /bar/im]) {
                assert.throws(
                    () => new PatternMatcher(value),
                    "'pattern' should contains 'g' flag."
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
                    expected: [
                        Object.assign(["foo"], {
                            index: 0,
                            input: "foo",
                        }),
                    ],
                },
                {
                    str: String.raw`\\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 2,
                            input: String.raw`\\foo`,
                        }),
                    ],
                },
                {
                    str: String.raw`\\\\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 4,
                            input: String.raw`\\\\foo`,
                        }),
                    ],
                },
                {
                    str: "-foofoofooabcfoo-",
                    expected: [
                        Object.assign(["foo"], {
                            index: 1,
                            input: "-foofoofooabcfoo-",
                        }),
                        Object.assign(["foo"], {
                            index: 4,
                            input: "-foofoofooabcfoo-",
                        }),
                        Object.assign(["foo"], {
                            index: 7,
                            input: "-foofoofooabcfoo-",
                        }),
                        Object.assign(["foo"], {
                            index: 13,
                            input: "-foofoofooabcfoo-",
                        }),
                    ],
                },
                {
                    str: String.raw`-foo\foofooabcfoo-`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 1,
                            input: String.raw`-foo\foofooabcfoo-`,
                        }),
                        Object.assign(["foo"], {
                            index: 8,
                            input: String.raw`-foo\foofooabcfoo-`,
                        }),
                        Object.assign(["foo"], {
                            index: 14,
                            input: String.raw`-foo\foofooabcfoo-`,
                        }),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/foo/g)
                    const actual = Array.from(matcher.execAll(str))
                    assert.deepStrictEqual(actual, expected)
                })
            }

            for (const { str, expected } of [
                {
                    str: "ab0c",
                    expected: [
                        Object.assign(["b0", "b", "0"], {
                            index: 1,
                            input: "ab0c",
                        }),
                    ],
                },
                {
                    str: "a1b2c3",
                    expected: [
                        Object.assign(["a1", "a", "1"], {
                            index: 0,
                            input: "a1b2c3",
                        }),
                        Object.assign(["b2", "b", "2"], {
                            index: 2,
                            input: "a1b2c3",
                        }),
                        Object.assign(["c3", "c", "3"], {
                            index: 4,
                            input: "a1b2c3",
                        }),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/(\w)(\d)/g)
                    const actual = Array.from(matcher.execAll(str))
                    assert.deepStrictEqual(actual, expected)
                })
            }

            it("should iterate for two strings in parallel.", () => {
                const matcher = new PatternMatcher(/\w/g)
                const expected1 = [
                    Object.assign(["a"], {
                        index: 0,
                        input: "a--b-c",
                    }),
                    Object.assign(["b"], {
                        index: 3,
                        input: "a--b-c",
                    }),
                    Object.assign(["c"], {
                        index: 5,
                        input: "a--b-c",
                    }),
                ]
                const expected2 = [
                    Object.assign(["a"], {
                        index: 1,
                        input: "-ab-c-",
                    }),
                    Object.assign(["b"], {
                        index: 2,
                        input: "-ab-c-",
                    }),
                    Object.assign(["c"], {
                        index: 4,
                        input: "-ab-c-",
                    }),
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
                    expected: [
                        Object.assign(["foo"], {
                            index: 0,
                            input: "foo",
                        }),
                    ],
                },
                {
                    str: String.raw`\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 1,
                            input: String.raw`\foo`,
                        }),
                    ],
                },
                {
                    str: String.raw`\\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 2,
                            input: String.raw`\\foo`,
                        }),
                    ],
                },
                {
                    str: String.raw`\\\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 3,
                            input: String.raw`\\\foo`,
                        }),
                    ],
                },
                {
                    str: String.raw`\\\\foo`,
                    expected: [
                        Object.assign(["foo"], {
                            index: 4,
                            input: String.raw`\\\\foo`,
                        }),
                    ],
                },
            ]) {
                it(`should return ${JSON.stringify(
                    expected
                )} in ${JSON.stringify(str)}.`, () => {
                    const matcher = new PatternMatcher(/foo/g, {
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
                const matcher = new PatternMatcher(/foo/g)
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
                pattern: /a(b)/g,
                str: "abc",
                replacer: "$1",
                expected: "bc",
            },
        ]) {
            it(`should return ${expected} in ${JSON.stringify(
                str
            )} and ${JSON.stringify(replacer)}.`, () => {
                const matcher = new PatternMatcher(pattern || /[a-c]/g)
                const actual = str.replace(matcher, replacer)
                assert.deepStrictEqual(actual, expected)
            })
        }

        it(`should pass the correct arguments to replacers.`, () => {
            const matcher = new PatternMatcher(/(\w)(\d)/g)
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
