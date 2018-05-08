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
                const name = getPropertyName(node)
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

Get the string value of a given literal node.

### Parameters

 Name | Type | Description
:-----|:-----|:------------
node | Node | The node to get that string value.
initialScope | Scope or undefined | Optional. The scope object to find variables. If this scope was given and the node is an Identifier node, it finds the variable of the identifier, and if the variable is a `const` variable, it returns the value of the `const` variable.

### Return value

The string value of the node.
If the node is not constant then it returns `null`.

### Example

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
