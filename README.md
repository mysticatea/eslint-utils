# eslint-utils

[![npm version](https://img.shields.io/npm/v/eslint-utils.svg)](https://www.npmjs.com/package/eslint-utils)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-utils.svg)](http://www.npmtrends.com/eslint-utils)
[![Build Status](https://travis-ci.org/mysticatea/eslint-utils.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-utils)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-utils)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-utils.svg)](https://david-dm.org/mysticatea/eslint-utils)

## 🏁 Goal

This package provides utility functions and classes for make ESLint custom rules.

For example, there is the class which tracks variable references.

```js
const { ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {},
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())

                // Track the references of global variables.
                for (const { node, path } of tracker.iterateGlobalReferences({
                    // Iterate the call expressions of `console.log`, `console.info`
                    console: {
                        log: { [ReferenceTracker.CALL]: true },
                        info: { [ReferenceTracker.CALL]: true },
                    },
                })) {
                    context.report({
                        node,
                        message: "Don't use {{name}}.",
                        data: { name: path.join(".") },
                    })
                }

                // Track the references of CommonJS modules.
                for (const { node, path } of tracker.iterateCjsReferences({
                    // Iterate the access of `fs.exists`.
                    fs: {
                        exists: { [ReferenceTracker.READ]: true },
                    },
                })) {
                    context.report({
                        node,
                        message: "Don't use {{name}}.",
                        data: { name: path.join(".") },
                    })
                }
            }
        }
    },
}
```

## 💿 Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```
npm install eslint-utils
```

### Requirements

- Node.js `6.5.0` or newer.

## 📖 Usage

See [API reference](https://mysticatea.github.io/eslint-utils/).

## 📰 Changelog

See [releases](https://github.com/mysticatea/eslint-utils/releases).

## ❤️ Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run clean` removes the coverage result of `npm test` command.
- `npm run coverage` shows the coverage result of the last `npm test` command.
- `npm run lint` runs ESLint.
- `npm run watch` runs tests on each file change.
