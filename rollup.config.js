/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import sourcemaps from "rollup-plugin-sourcemaps"

/**
 * Define the output configuration.
 * @param {string} ext The extension for generated files.
 * @returns {object} The output configuration
 */
function config(ext) {
    return {
        input: ".temp/index.js",
        output: {
            file: `index${ext}`,
            format: ext === ".mjs" ? "es" : "cjs",
            sourcemap: true,
            sourcemapFile: `index${ext}.map`,
            strict: true,
            banner: `/*! @author Toru Nagashima <https://github.com/mysticatea> */`,
        },
        plugins: [sourcemaps()],
    }
}

export default [config(".js"), config(".mjs")]
