import fs from "fs"
import path from "path"

const root = "src"
const content = fs
    .readdirSync(root)
    .filter(filename => filename !== "index.js")
    .map(filename => path.basename(filename, ".js"))
    .map(moduleId => `export * from "./${moduleId}"\n`)
    .join("")

fs.writeFileSync(path.join(root, "index.js"), content)
