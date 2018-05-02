/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import fs from "fs"
import path from "path"

const root = path.resolve(__dirname, "../src/")
const content = fs
    .readdirSync(root)
    .filter(filename => filename !== "index.ts")
    .map(filename => path.basename(filename, ".ts"))
    .map(moduleId => `export * from "./${moduleId}"\n`)
    .join("")

fs.writeFileSync(path.join(root, "index.ts"), content)
