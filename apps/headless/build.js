import ncc from "@vercel/ncc"
import path from "node:path"
import fs from "node:fs/promises"

async function build() {
  const entry = path.resolve(process.cwd(), 'index.ts')
  console.log(entry)
  const output = await ncc(entry, {
    minify: true,
    sourceMapRegister: false,
    cache: false,
  })
  await fs.writeFile(path.resolve(process.cwd(), 'public/dash.headless.js'), output.code)
}

build()
  .then(() => {
    console.log("build successful");
    process.exit(0);
  })
  .catch((err) => {
    console.error("build failed");
    console.error(err);
    process.exit(1);
  });