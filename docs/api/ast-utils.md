# AST utilities

----

## getFunctionHeadLocation

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

### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The function node to get the location. This should be any of `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression` node.
sourceCode | SourceCode | The source code object to get tokens.

### Return value

The location object.

### Example

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

----

## getFunctionNameWithKind

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

### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The function node to get the name and kind. This should be any of `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression` node.

### Return value

The name and kind of the function.

### Example

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

----

## getPropertyName

```js
const name = utils.getPropertyName(node)
const name = utils.getPropertyName(node, initialScope)
```

Get the property name of a given property node.

If the node is a computed property, this tries to compute the property name by the [getStringIfConstant](#getstringifconstant) function.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node to get that name. This shuld be any of `MemberExpression`, `Property`, and `MethodDefinition` node.
initialScope | Scope or undefined | Optional. The scope object to find variables.

### Return value

The property name of the node.
If the property name is not constant then it returns `null`.

### Example

```js{8}
const { getPropertyName } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            MemberExpression(node) {
                const name = getPropertyName(node, context.getScope())
            },
        }
    },
}
```

----

## getStaticValue

```js
const ret1 = utils.getStaticValue(node)
const ret2 = utils.getStaticValue(node, initialScope)
```

Get the value of a given node if it can decide the value statically.

If the 2nd parameter `initialScope` was given, this function tries to resolve identifier references which are in the given node as much as possible.
In the resolving way, it does on the assumption that built-in global objects have not been modified.
For example, it considers `Symbol.iterator`, ``String.raw`hello` ``, and `Object.freeze({a: 1}).a` as static.

For another complex example, this function can evaluate the following cases on AST:

```js{6}
const eventName = "click"
const aMap = Object.freeze({
    click: 777
})

;`on${eventName} : ${aMap[eventName]}` // evaluated to "onclick : 777"
```

### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node to get that the value.
initialScope | Scope or undefined | Optional. The scope object to find variables.

### Return value

The `{ value: any }` shaped object. The `value` property is the static value.

If it couldn't compute the static value of the node, it returns `null`.

### Example

```js{8}
const { getStaticValue } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            ExpressionStatement(node) {
                const evaluated = getStaticValue(node, context.getScope())
                if (evaluated) {
                    const staticValue = evaluated.value
                    // ...
                }
            },
        }
    },
}
```

----

## getStringIfConstant

```js
const str1 = utils.getStringIfConstant(node)
const str2 = utils.getStringIfConstant(node, initialScope)
```

Get the string value of a given node.

This function is a tiny wrapper of the [getStaticValue](#getstaticvalue) function.
I.e., this is the same as below:

```js
function getStringIfConstant(node, initialScope) {
    const evaluated = getStaticValue(node, initialScope)
    return evaluated && String(evaluated.value)
}
```

----

## PatternMatcher class

```js
const matcher = new utils.PatternMatcher(pattern, options)
```

The class to find a pattern in strings as handling escape sequences.

It ignores the found pattern if it's escaped with `\`.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
pattern | RegExp | The regular expression pattern to find.
options.escaped | boolean | Optional. Default is `false`. If `true` then this matches to escaped patterns.

## matcher.execAll

```js
const iterator = matcher.execAll(str)
```

Iterate all matched parts in a given string.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
str | string | The string to find this pattern.

### Return value

The generator which iterates [RegExpExecArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Description) object.

### Example

```js{9}
const { PatternMatcher } = require("eslint-utils")
const matcher = new PatternMatcher(/\(\?<[_$\w]/g)

module.exports = {
    meta: {},
    create(context) {
        return {
            "Literal[regex]"(node) {
                for (const { index } of matcher.execAll(node.regex.pattern)) {
                    context.report({
                        node,
                        loc: {
                            line: node.loc.start.line,
                            column: node.loc.start.column + index
                        },
                        message: "ES2018 RegExp named capture groups",
                    })
                }
            },
        }
    },
}
```

## matcher.test

```js
const matched = matcher.test(str)
```

Check whether this pattern matches a given string or not.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
str | string | The string to find this pattern.

### Return value

`true` if this pattern matched the string.

### Example

```js{9}
const { PatternMatcher } = require("eslint-utils")
const matcher = new PatternMatcher(/\(\?<[_$\w]/g)

module.exports = {
    meta: {},
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (matcher.test(node.regex.pattern)) {
                    context.report({
                        node,
                        message: "RegExp has ES2018 named capture groups",
                    })
                }
            },
        }
    },
}
```

## matcher[Symbol.replace]

```js
const replacedStr = str.replace(matcher, replacer)
```

Replace all matched parts by a given replacer.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
str | string | The string to be replaced.
replacer | string or function | The string or function to replace each matched part. This is the same as the 2nd parameter of [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

### Return value

The replaced result.

### Example

```js{9}
const { PatternMatcher } = require("eslint-utils")
const matcher = new PatternMatcher(/\\p{Script=Greek}/g)

module.exports = {
    meta: {},
    create(context) {
        return {
            "Literal[regex]"(node) {
                const replacedPattern = node.regex.pattern.replace(
                    matcher,
                    "[\\u0370-\\u0373\\u0375-\\u0377\\u037A-\\u037D\\u037F\\u0384\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03E1\\u03F0-\\u03FF\\u1D26-\\u1D2A\\u1D5D-\\u1D61\\u1D66-\\u1D6A\\u1DBF\\u1F00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FC4\\u1FC6-\\u1FD3\\u1FD6-\\u1FDB\\u1FDD-\\u1FEF\\u1FF2-\\u1FF4\\u1FF6-\\u1FFE\\u2126\\uAB65]|\\uD800[\\uDD40-\\uDD8E\\uDDA0]|\\uD834[\\uDE00-\\uDE45]"
                )
            },
        }
    },
}
```
