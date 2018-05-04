---
sidebarDepth: 3
---

# API Reference

## AST utilities

### getFunctionHeadLocation

```js
const loc = utils.getFunctionHeadLocation(node, sourceCode)
```

Get the proper location of a given function node to report.

<details><summary>Show the location examples:</summary>

```
- `function foo() {}`
   ^^^^^^^^^^^^
- `(function foo() {})`
    ^^^^^^^^^^^^
- `(function() {})`
    ^^^^^^^^
- `function* foo() {}`
   ^^^^^^^^^^^^^
- `(function* foo() {})`
    ^^^^^^^^^^^^^
- `(function*() {})`
    ^^^^^^^^^
- `() => {}`
      ^^
- `async () => {}`
            ^^
- `({ foo: function foo() {} })`
      ^^^^^^^^^^^^^^^^^
- `({ foo: function() {} })`
      ^^^^^^^^^^^^^
- `({ ['foo']: function() {} })`
      ^^^^^^^^^^^^^^^^^
- `({ [foo]: function() {} })`
      ^^^^^^^^^^^^^^^
- `({ foo() {} })`
      ^^^
- `({ foo: function* foo() {} })`
      ^^^^^^^^^^^^^^^^^^
- `({ foo: function*() {} })`
      ^^^^^^^^^^^^^^
- `({ ['foo']: function*() {} })`
      ^^^^^^^^^^^^^^^^^^
- `({ [foo]: function*() {} })`
      ^^^^^^^^^^^^^^^^
- `({ *foo() {} })`
      ^^^^
- `({ foo: async function foo() {} })`
      ^^^^^^^^^^^^^^^^^^^^^^^
- `({ foo: async function() {} })`
      ^^^^^^^^^^^^^^^^^^^
- `({ ['foo']: async function() {} })`
      ^^^^^^^^^^^^^^^^^^^^^^^
- `({ [foo]: async function() {} })`
      ^^^^^^^^^^^^^^^^^^^^^
- `({ async foo() {} })`
      ^^^^^^^^^
- `({ get foo() {} })`
      ^^^^^^^
- `({ set foo(a) {} })`
      ^^^^^^^
- `class A { constructor() {} }`
             ^^^^^^^^^^^
- `class A { foo() {} }`
             ^^^
- `class A { *foo() {} }`
             ^^^^
- `class A { async foo() {} }`
             ^^^^^^^^^
- `class A { ['foo']() {} }`
             ^^^^^^^
- `class A { *['foo']() {} }`
             ^^^^^^^^
- `class A { async ['foo']() {} }`
             ^^^^^^^^^^^^^
- `class A { [foo]() {} }`
             ^^^^^
- `class A { *[foo]() {} }`
             ^^^^^^
- `class A { async [foo]() {} }`
             ^^^^^^^^^^^
- `class A { get foo() {} }`
             ^^^^^^^
- `class A { set foo(a) {} }`
             ^^^^^^^
- `class A { static foo() {} }`
             ^^^^^^^^^^
- `class A { static *foo() {} }`
             ^^^^^^^^^^^
- `class A { static async foo() {} }`
             ^^^^^^^^^^^^^^^^
- `class A { static get foo() {} }`
             ^^^^^^^^^^^^^^
- `class A { static set foo(a) {} }`
             ^^^^^^^^^^^^^^
```

</details>

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The function node to get the location. This should be any of `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression` node.
sourceCode | SourceCode | The source code object to get tokens.

#### Return value

The location object.

#### Example

```js{12}
const { getFunctionHeadLocation } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        const sourceCode = context.getSourceCode()

        return {
            FunctionDeclaration(node) {
                context.report({
                    node,
                    loc: getFunctionHeadLocation(node, sourceCode),
                    message: "disallow this function!",
                })
            },
        }
    },
}
```

### getFunctionNameWithKind

```js
const name = utils.getFunctionNameWithKind(node)
```

Get the name and kind of a given function node.

<details><summary>Show the name and kind examples:</summary>

```
- `function foo() {}`  .................... `function 'foo'`
- `(function foo() {})`  .................. `function 'foo'`
- `(function() {})`  ...................... `function`
- `function* foo() {}`  ................... `generator function 'foo'`
- `(function* foo() {})`  ................. `generator function 'foo'`
- `(function*() {})`  ..................... `generator function`
- `() => {}`  ............................. `arrow function`
- `async () => {}`  ....................... `async arrow function`
- `({ foo: function foo() {} })`  ......... `method 'foo'`
- `({ foo: function() {} })`  ............. `method 'foo'`
- `({ ['foo']: function() {} })`  ......... `method 'foo'`
- `({ [foo]: function() {} })`  ........... `method`
- `({ foo() {} })`  ....................... `method 'foo'`
- `({ foo: function* foo() {} })`  ........ `generator method 'foo'`
- `({ foo: function*() {} })`  ............ `generator method 'foo'`
- `({ ['foo']: function*() {} })`  ........ `generator method 'foo'`
- `({ [foo]: function*() {} })`  .......... `generator method`
- `({ *foo() {} })`  ...................... `generator method 'foo'`
- `({ foo: async function foo() {} })`  ... `async method 'foo'`
- `({ foo: async function() {} })`  ....... `async method 'foo'`
- `({ ['foo']: async function() {} })`  ... `async method 'foo'`
- `({ [foo]: async function() {} })`  ..... `async method`
- `({ async foo() {} })`  ................. `async method 'foo'`
- `({ get foo() {} })`  ................... `getter 'foo'`
- `({ set foo(a) {} })`  .................. `setter 'foo'`
- `class A { constructor() {} }`  ......... `constructor`
- `class A { foo() {} }`  ................. `method 'foo'`
- `class A { *foo() {} }`  ................ `generator method 'foo'`
- `class A { async foo() {} }`  ........... `async method 'foo'`
- `class A { ['foo']() {} }`  ............. `method 'foo'`
- `class A { *['foo']() {} }`  ............ `generator method 'foo'`
- `class A { async ['foo']() {} }`  ....... `async method 'foo'`
- `class A { [foo]() {} }`  ............... `method`
- `class A { *[foo]() {} }`  .............. `generator method`
- `class A { async [foo]() {} }`  ......... `async method`
- `class A { get foo() {} }`  ............. `getter 'foo'`
- `class A { set foo(a) {} }`  ............ `setter 'foo'`
- `class A { static foo() {} }`  .......... `static method 'foo'`
- `class A { static *foo() {} }`  ......... `static generator method 'foo'`
- `class A { static async foo() {} }`  .... `static async method 'foo'`
- `class A { static get foo() {} }`  ...... `static getter 'foo'`
- `class A { static set foo(a) {} }`  ..... `static setter 'foo'`
```

</details>

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The function node to get the name and kind. This should be any of `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression` node.

#### Return value

The name and kind of the function.

#### Example

```js{11}
const { getFunctionNameWithKind } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            FunctionDeclaration(node) {
                context.report({
                    node,
                    message: "disallow this {{name}}!",
                    data: { name: getFunctionNameWithKind(node) }
                })
            },
        }
    },
}
```

### getPropertyName

```js
const name = utils.getPropertyName(node)
```

Get the property name of a given property node.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node to get that name. This shuld be any of `MemberExpression`, `Property`, and `MethodDefinition` node.

#### Return value

The property name of the node.
If the property name is not constant then it returns `null`.

#### Example

```js{8}
const { getPropertyName } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            MemberExpression(node) {
                const name = getPropertyName(node)
            },
        }
    },
}
```

### getStringIfConstant

```js
const str = utils.getStringIfConstant(node)
```

Get the string value of a given literal node.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node to get that string value.

#### Return value

The string value of the node.
If the node is not constant then it returns `null`.

#### Example

```js{9}
const { getStringIfConstant } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            MemberExpression(node) {
                const name = node.computed
                    ? getStringIfConstant(node.property)
                    : node.property.name
            },
        }
    },
}
```

## Token utilities

### isArrowToken / isNotArrowToken

```js
utils.isArrowToken(token)
utils.isNotArrowToken(token)
```

Check whether a given token is a `=>` token or not.

#### Examples

```js{9}
const { isArrowToken } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        const sourceCode = context.getSourceCode()

        return {
            ArrowFunctionExpression(node) {
                const arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken)
            },
        }
    },
}
```

### isClosingBraceToken / isNotClosingBraceToken

```js
utils.isClosingBraceToken(token)
utils.isNotClosingBraceToken(token)
```

Check whether a given token is a `}` token or not.

### isClosingBracketToken / isNotClosingBracketToken

```js
utils.isClosingBracketToken(token)
utils.isNotClosingBracketToken(token)
```

Check whether a given token is a `]` token or not.

### isClosingParenToken / isNotClosingParenToken

```js
utils.isClosingParenToken(token)
utils.isNotClosingParenToken(token)
```

Check whether a given token is a `)` token or not.

### isColonToken / isNotColonToken

```js
utils.isColonToken(token)
utils.isNotColonToken(token)
```

Check whether a given token is a `:` token or not.

### isCommaToken / isNotCommaToken

```js
utils.isCommaToken(token)
utils.isNotCommaToken(token)
```

Check whether a given token is a `,` token or not.

### isCommentToken / isNotCommentToken

```js
utils.isCommentToken(token)
utils.isNotCommentToken(token)
```

Check whether a given token is a comment token or not.

### isOpeningBraceToken / isNotOpeningBraceToken

```js
utils.isOpeningBraceToken(token)
utils.isNotOpeningBraceToken(token)
```

Check whether a given token is a `{` token or not.

### isOpeningBracketToken / isNotOpeningBracketToken

```js
utils.isOpeningBracketToken(token)
utils.isNotOpeningBracketToken(token)
```

Check whether a given token is a `[` token or not.

### isOpeningParenToken / isNotOpeningParenToken

```js
utils.isOpeningParenToken(token)
utils.isNotOpeningParenToken(token)
```

Check whether a given token is a `(` token or not.

### isSemicolonToken / isNotSemicolonToken

```js
utils.isSemicolonToken(token)
utils.isNotSemicolonToken(token)
```

Check whether a given token is a `;` token or not.

## Scope analysis utilities

### findVariable

```js
const variable = utils.findVariable(initialScope, name)
```

Get the variable of a given name.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
initialScope | Scope | The scope object to start finding variables.
name | string or Node | The variable name to find. This can be an Identifier node.

#### Return value

The found variable or `null`.

#### Example

```js{8}
const { findVariable } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            Identifier(node) {
                const variable = findVariable(context.getScope(), node)
            },
        }
    },
}
```
### getInnermostScope

```js
const scope = utils.getInnermostScope(initialScope, node)
```

Get the innermost scope which contains a given node.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
initialScope | Scope | The scope to start finding.
node | Node | The node to find the innermost scope.

#### Return value

The innermost scope which contains the given node.
If such scope doesn't exist then it returns the 1st argument `initialScope`.

#### Example

```js{9}
const { getInnermostScope } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            "Program"(node) {
                const globalScope = context.getScope()
                const maybeNodejsScope = getInnermostScope(globalScope, node)
            },
        }
    },
}
```

### ReferenceTracker

```js
const tracker = new utils.ReferenceTracker(globalScope, options)
```

The tracker for references.
This provides reference tracking for global variables, CommonJS modules, and ES modules.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
globalScope | Scope | The global scope.
options.mode | `"strict"` or `"legacy"` | The mode which determines how the `tracker.iterateEsmReferences()` method scans CommonJS modules. If this is `"strict"`, the method binds CommonJS modules to the default export. Otherwise, the method binds CommonJS modules to both the default export and named exports. Optional. Default is `"strict"`.
options.globalObjectNames | string[] | The name list of Global Object. Optional. Default is `["global", "self", "window"]`.

### tracker.iterateGlobalReferences

```js
const it = tracker.iterateGlobalReferences(traceMap)
```

Iterate the references that the given `traceMap` determined.
This method starts to search from global variables.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
traceMap | object | The object which determines global variables and properties it iterates.

#### Return value

The Iterator which iterates the reference of global variables.
Every reference is the object that has the following properties.

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node of the reference.
path | string[] | The path of the reference. For example, if it's the access of `console.log` then `["console", "log"]`.
type | symbol | The reference type. If this is `ReferenceTracker.READ` then it read the variable (or property). If this is `ReferenceTracker.CALL` then it called the variable (or property). If this is `ReferenceTracker.CONSTRUCT` then it called the variable (or property) with the `new` operator.
entry | any | The property value of any of `ReferenceTracker.READ`, `ReferenceTracker.CALL`, and `ReferenceTracker.CONSTRUCT`.

#### Examples

```js
const { ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                const traceMap = {
                    // Find `console.log`, `console.info`, `console.warn`, and `console.error`.
                    console: {
                        log: { [ReferenceTracker.READ]: true },
                        info: { [ReferenceTracker.READ]: true },
                        warn: { [ReferenceTracker.READ]: true },
                        error: { [ReferenceTracker.READ]: true },
                    },
                    // Find `Buffer()` and `new Buffer()`.
                    Buffer: {
                        [ReferenceTracker.CALL]: true,
                        [ReferenceTracker.CONSTRUCT]: true,
                    },
                }

                for (const { node, path } of tracker.iterateGlobalReferences(traceMap)) {
                    context.report({
                        node,
                        message: "disallow {{name}}.",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
```

### tracker.iterateCjsReferences

```js
const it = tracker.iterateCjsReferences(traceMap)
```

Iterate the references that the given `traceMap` determined.
This method starts to search from `require()` expression.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
traceMap | object | The object which determines modules it iterates.

#### Return value

The Iterator which iterates the reference of modules.
Every reference is the object that has the following properties.

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node of the reference.
path | string[] | The path of the reference. For example, if it's the access of `fs.exists` then `["fs", "exists"]`.
type | symbol | The reference type. If this is `ReferenceTracker.READ` then it read the variable (or property). If this is `ReferenceTracker.CALL` then it called the variable (or property). If this is `ReferenceTracker.CONSTRUCT` then it called the variable (or property) with the `new` operator.
entry | any | The property value of any of `ReferenceTracker.READ`, `ReferenceTracker.CALL`, and `ReferenceTracker.CONSTRUCT`.

#### Examples

```js
const { ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                const traceMap = {
                    // Find `Buffer()` and `new Buffer()` of `buffer` module.
                    buffer: {
                        Buffer: {
                            [ReferenceTracker.CALL]: true,
                            [ReferenceTracker.CONSTRUCT]: true,
                        },
                    },
                    // Find `exists` of `fs` module.
                    fs: {
                        exists: {
                            [ReferenceTracker.READ]: true,
                        },
                    },
                }

                for (const { node, path } of tracker.iterateCjsReferences(traceMap)) {
                    context.report({
                        node,
                        message: "disallow {{name}}.",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
```

### tracker.iterateEsmReferences

```js
const it = tracker.iterateEsmReferences(traceMap)
```

Iterate the references that the given `traceMap` determined.
This method starts to search from `import`/`export` declarations.

#### Parameters

 Name | Type | Description
:-----|:-----|:------------
traceMap | object | The object which determines modules it iterates.

#### Return value

The Iterator which iterates the reference of modules.
Every reference is the object that has the following properties.

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node of the reference.
path | string[] | The path of the reference. For example, if it's the access of `fs.exists` then `["fs", "exists"]`.
type | symbol | The reference type. If this is `ReferenceTracker.READ` then it read the variable (or property). If this is `ReferenceTracker.CALL` then it called the variable (or property). If this is `ReferenceTracker.CONSTRUCT` then it called the variable (or property) with the `new` operator.
entry | any | The property value of any of `ReferenceTracker.READ`, `ReferenceTracker.CALL`, and `ReferenceTracker.CONSTRUCT`.

#### Examples

```js
const { ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                const traceMap = {
                    // Find `Buffer()` and `new Buffer()` of `buffer` module.
                    buffer: {
                        Buffer: {
                            [ReferenceTracker.CALL]: true,
                            [ReferenceTracker.CONSTRUCT]: true,
                        },
                    },
                    // Find `exists` of `fs` module.
                    fs: {
                        exists: {
                            [ReferenceTracker.READ]: true,
                        },
                    },
                }

                for (const { node, path } of tracker.iterateEsmReferences(traceMap)) {
                    context.report({
                        node,
                        message: "disallow {{name}}.",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
```
