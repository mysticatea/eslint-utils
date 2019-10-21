"use strict"

module.exports = {
    title: "eslint-utils",
    description: "Utilities for ESLint plugins and custom rules.",
    serviceWorker: true,

    themeConfig: {
        repo: "mysticatea/eslint-utils",
        docsRepo: "mysticatea/eslint-utils",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,

        sidebar: {
            "/": [
                {
                    title: "Guide",
                    collapsable: false,
                    children: ["/"],
                },
                {
                    title: "API Reference",
                    collapsable: false,
                    children: [
                        "/api/ast-utils",
                        "/api/scope-utils",
                        "/api/token-utils",
                    ],
                },
            ],
        },
    },
}
