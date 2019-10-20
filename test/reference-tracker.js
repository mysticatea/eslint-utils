import assert from "assert"
import eslint from "eslint"
import { CALL, CONSTRUCT, ESM, READ, ReferenceTracker } from "../src/"

const config = {
    parserOptions: { ecmaVersion: 2018, sourceType: "module" },
    globals: { Reflect: false },
    rules: { test: "error" },
}

describe("The 'ReferenceTracker' class:", () => {
    describe("the 'iterateGlobalReferences' method", () => {
        for (const { description, code, traceMap, expected } of [
            {
                description:
                    "should iterate the references of a given global variable.",
                code: "var x = Object; { let Object; var y = Object }",
                traceMap: {
                    Object: {
                        [READ]: 1,
                        foo: { [CALL]: 2 },
                        Foo: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "Identifier" },
                        path: ["Object"],
                        type: READ,
                        info: 1,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with MemberExpression",
                code: [
                    "Object.a; Object.a(); new Object.a();",
                    "Object.b; Object.b(); new Object.b();",
                    "Object.c; Object.c(); new Object.c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with VariableDeclarator",
                code: [
                    "var x = Object;",
                    "x.a; x.a(); new x.a();",
                    "x.b; x.b(); new x.b();",
                    "x.c; x.c(); new x.c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with VariableDeclarator 2",
                code: [
                    "var x = Object, a = x.a, b = x.b, c = x.c;",
                    "a; a(); new a();",
                    "b; b(); new b();",
                    "c; c(); new c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with AssignmentExpression",
                code: [
                    "var x, a, b, c;",
                    "a = (x = Object).a; b = x.b; c = x.c;",
                    "a; a(); new a();",
                    "b; b(); new b();",
                    "c; c(); new c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with destructuring",
                code: [
                    "var {a, b, c} = Object;",
                    "a; a(); new a();",
                    "b; b(); new b();",
                    "c; c(); new c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "Property" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with AssignmentPattern",
                code: [
                    "var {x: {a, b, c} = Object} = {};",
                    "a; a(); new a();",
                    "b; b(); new b();",
                    "c; c(); new c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "Property" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with 'window'.",
                code: [
                    "/*global window */",
                    "var {Object: {a, b, c}} = window;",
                    "a; a(); new a();",
                    "b; b(); new b();",
                    "c; c(); new c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "Property" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the member references of a given global variable, with 'window'.",
                code: [
                    "/*global window */",
                    "window.Object.a;",
                    "window.Object.b; window.Object.b(); new window.Object.b();",
                    "window.Object.c; window.Object.c(); new window.Object.c();",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["Object", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["Object", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["Object", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should not iterate the references of a given global variable if it's modified.",
                code: [
                    "Object = {}",
                    "Object.a",
                    "Object.b()",
                    "new Object.c()",
                ].join("\n"),
                traceMap: {
                    Object: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [],
            },
            {
                description:
                    "should not iterate the references through unary/binary expressions.",
                code: [
                    'var construct = typeof Reflect !== "undefined" ? Reflect.construct : undefined',
                    "construct()",
                ].join("\n"),
                traceMap: {
                    Reflect: { [CALL]: 1 },
                },
                expected: [],
            },
        ]) {
            it(description, () => {
                const linter = new eslint.Linter()

                let actual = null
                linter.defineRule("test", context => ({
                    "Program:exit"() {
                        const tracker = new ReferenceTracker(context.getScope())
                        actual = Array.from(
                            tracker.iterateGlobalReferences(traceMap)
                        ).map(x =>
                            Object.assign(x, { node: { type: x.node.type } })
                        )
                    },
                }))
                linter.verify(code, config)

                assert.deepStrictEqual(actual, expected)
            })
        }
    })

    describe("the 'iterateCjsReferences' method", () => {
        for (const { description, code, traceMap, expected } of [
            {
                description:
                    "should iterate the references of a given CJS modules.",
                code: [
                    "/*global require */",
                    "const abc = require('abc');",
                    "abc();",
                    "new abc();",
                    "abc.xyz;",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [READ]: 1,
                        [CALL]: 2,
                        [CONSTRUCT]: 3,
                        xyz: { [READ]: 4 },
                    },
                },
                expected: [
                    {
                        node: { type: "CallExpression" },
                        path: ["abc"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["abc"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["abc"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "xyz"],
                        type: READ,
                        info: 4,
                    },
                ],
            },
            {
                description:
                    "should NOT iterate the references of a given CJS modules if the 'require' variable wasn't defined.",
                code: [
                    "const abc = require('abc');",
                    "abc();",
                    "new abc();",
                    "abc.xyz;",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [READ]: 1,
                        [CALL]: 2,
                        [CONSTRUCT]: 3,
                        xyz: { [READ]: 4 },
                    },
                },
                expected: [],
            },
            {
                description:
                    "should NOT iterate the references of a given CJS modules if the 'require' variable was overrided.",
                code: [
                    "/*global require */",
                    "const require = () => {};",
                    "const abc = require('abc');",
                    "abc();",
                    "new abc();",
                    "abc.xyz;",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [READ]: 1,
                        [CALL]: 2,
                        [CONSTRUCT]: 3,
                        xyz: { [READ]: 4 },
                    },
                },
                expected: [],
            },
        ]) {
            it(description, () => {
                const linter = new eslint.Linter()

                let actual = null
                linter.defineRule("test", context => ({
                    "Program:exit"() {
                        const tracker = new ReferenceTracker(context.getScope())
                        actual = Array.from(
                            tracker.iterateCjsReferences(traceMap)
                        ).map(x =>
                            Object.assign(x, { node: { type: x.node.type } })
                        )
                    },
                }))
                linter.verify(code, config)

                assert.deepStrictEqual(actual, expected)
            })
        }
    })

    describe("the 'iterateEsmReferences' method", () => {
        for (const { description, code, traceMap, expected } of [
            {
                description:
                    "should iterate the references of a given ES modules (with CJS module and the default export).",
                code: [
                    "import abc from 'abc';",
                    "abc();",
                    "new abc();",
                    "abc.xyz;",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [READ]: 1,
                        [CALL]: 2,
                        [CONSTRUCT]: 3,
                        xyz: { [READ]: 4 },
                    },
                },
                expected: [
                    {
                        node: { type: "ImportDeclaration" },
                        path: ["abc"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["abc"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["abc"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "xyz"],
                        type: READ,
                        info: 4,
                    },
                ],
            },
            {
                description: "should map CJS module to the default export.",
                code: [
                    "import {default as x} from 'abc';",
                    "x.a;",
                    "x.b();",
                    "new x.c();",
                ].join("\n"),
                traceMap: {
                    abc: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["abc", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["abc", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description: "should NOT map CJS module to the named exports.",
                code: [
                    "import {a, b, c} from 'abc';",
                    "a;",
                    "b();",
                    "new c();",
                ].join("\n"),
                traceMap: {
                    abc: {
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [],
            },
            {
                description:
                    "should iterate the references of a given ES modules.",
                code: [
                    "import x, {a, b, c, y} from 'abc';",
                    "x.a;",
                    "x.y;",
                    "a;",
                    "b();",
                    "new c();",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [ESM]: true,
                        default: {
                            y: { [READ]: 4 },
                        },
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "default", "y"],
                        type: READ,
                        info: 4,
                    },
                    {
                        node: { type: "ImportSpecifier" },
                        path: ["abc", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["abc", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["abc", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the references of a given ES modules, with ImportNamespaceSpecifier.",
                code: [
                    "import * as x from 'abc';",
                    "x.default.a;",
                    "x.default.y;",
                    "x.a;",
                    "x.b();",
                    "new x.c();",
                ].join("\n"),
                traceMap: {
                    abc: {
                        [ESM]: true,
                        default: {
                            y: { [READ]: 4 },
                        },
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                    },
                },
                expected: [
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "default", "y"],
                        type: READ,
                        info: 4,
                    },
                    {
                        node: { type: "MemberExpression" },
                        path: ["abc", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "CallExpression" },
                        path: ["abc", "b"],
                        type: CALL,
                        info: 2,
                    },
                    {
                        node: { type: "NewExpression" },
                        path: ["abc", "c"],
                        type: CONSTRUCT,
                        info: 3,
                    },
                ],
            },
            {
                description:
                    "should iterate the references of a given ES modules, with ExportNamedDeclaration.",
                code: "export {a, b, c} from 'abc';",
                traceMap: {
                    abc: {
                        [ESM]: true,
                        default: {
                            y: { [READ]: 4 },
                        },
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                        d: { [READ]: 5 },
                    },
                },
                expected: [
                    {
                        node: { type: "ExportSpecifier" },
                        path: ["abc", "a"],
                        type: READ,
                        info: 1,
                    },
                ],
            },
            {
                description:
                    "should iterate the references of a given ES modules, with ExportAllDeclaration.",
                code: "export * from 'abc';",
                traceMap: {
                    abc: {
                        [ESM]: true,
                        default: {
                            y: { [READ]: 4 },
                        },
                        a: { [READ]: 1 },
                        b: { [CALL]: 2 },
                        c: { [CONSTRUCT]: 3 },
                        d: { [READ]: 5 },
                    },
                },
                expected: [
                    {
                        node: { type: "ExportAllDeclaration" },
                        path: ["abc", "a"],
                        type: READ,
                        info: 1,
                    },
                    {
                        node: { type: "ExportAllDeclaration" },
                        path: ["abc", "d"],
                        type: READ,
                        info: 5,
                    },
                ],
            },
        ]) {
            it(description, () => {
                const linter = new eslint.Linter()

                let actual = null
                linter.defineRule("test", context => ({
                    "Program:exit"() {
                        const tracker = new ReferenceTracker(context.getScope())
                        actual = Array.from(
                            tracker.iterateEsmReferences(traceMap)
                        ).map(x =>
                            Object.assign(x, { node: { type: x.node.type } })
                        )
                    },
                }))
                linter.verify(code, config)

                assert.deepStrictEqual(actual, expected)
            })
        }
    })
})
