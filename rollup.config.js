/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import sourcemaps from "rollup-plugin-sourcemaps"
import packageInfo from "./package.json"

/**
 * Define the output configuration.
 * @param {string} ext The extension for generated files.
 * @returns {object} The output configuration
 */
function config(ext) {
    return {
        input: "src/index.js",
        output: {
            exports: ext === ".mjs" ? undefined : "named",
            file: `index${ext}`,
            format: ext === ".mjs" ? "es" : "cjs",
            sourcemap: true,
            banner: "/*! @author Toru Nagashima <https://github.com/mysticatea> */",
        },
        plugins: [sourcemaps()],
        external: Object.keys(packageInfo.dependencies),
    }
}

export default [config(".js"), config(".mjs")]
