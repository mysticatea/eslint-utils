"use strict"

module.exports = {
    base: "/eslint-utils/",
    title: "eslint-utils",
    description: "Utilities for ESLint plugins and custom rules.",
    serviceWorker: true,
    ga: "UA-12936571-6",

    themeConfig: {
        repo: "mysticatea/eslint-utils",
        docsRepo: "mysticatea/eslint-utils",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,

        nav: [
            { text: "Guide", link: "/guide/getting-started" },
            { text: "API Reference", link: "/api/ast-utils" },
        ],
        sidebar: {
            "/": [
                {
                    title: "Guide",
                    collapsable: false,
                    children: ["/guide/getting-started"],
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
