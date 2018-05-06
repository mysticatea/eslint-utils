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
            { text: "Getting Started", link: "/guide/" },
            { text: "API Reference", link: "/api/" },
        ],
    },
}
