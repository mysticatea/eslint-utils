# Token utilities

## isArrowToken / isNotArrowToken

```js
utils.isArrowToken(token)
utils.isNotArrowToken(token)
```

Check whether a given token is a `=>` token or not.

### Examples

```js{10}
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

## isClosingBraceToken / isNotClosingBraceToken

```js
utils.isClosingBraceToken(token)
utils.isNotClosingBraceToken(token)
```

Check whether a given token is a `}` token or not.

## isClosingBracketToken / isNotClosingBracketToken

```js
utils.isClosingBracketToken(token)
utils.isNotClosingBracketToken(token)
```

Check whether a given token is a `]` token or not.

## isClosingParenToken / isNotClosingParenToken

```js
utils.isClosingParenToken(token)
utils.isNotClosingParenToken(token)
```

Check whether a given token is a `)` token or not.

## isColonToken / isNotColonToken

```js
utils.isColonToken(token)
utils.isNotColonToken(token)
```

Check whether a given token is a `:` token or not.

## isCommaToken / isNotCommaToken

```js
utils.isCommaToken(token)
utils.isNotCommaToken(token)
```

Check whether a given token is a `,` token or not.

## isCommentToken / isNotCommentToken

```js
utils.isCommentToken(token)
utils.isNotCommentToken(token)
```

Check whether a given token is a comment token or not.

## isOpeningBraceToken / isNotOpeningBraceToken

```js
utils.isOpeningBraceToken(token)
utils.isNotOpeningBraceToken(token)
```

Check whether a given token is a `{` token or not.

## isOpeningBracketToken / isNotOpeningBracketToken

```js
utils.isOpeningBracketToken(token)
utils.isNotOpeningBracketToken(token)
```

Check whether a given token is a `[` token or not.

## isOpeningParenToken / isNotOpeningParenToken

```js
utils.isOpeningParenToken(token)
utils.isNotOpeningParenToken(token)
```

Check whether a given token is a `(` token or not.

## isSemicolonToken / isNotSemicolonToken

```js
utils.isSemicolonToken(token)
utils.isNotSemicolonToken(token)
```

Check whether a given token is a `;` token or not.
