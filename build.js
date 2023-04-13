import * as esbuild from "esbuild";
import glob from "glob";
import ncc from "@vercel/ncc";
import path from "node:path";
import fs from "node:fs/promises";

async function buildWeb() {
  const paths = await glob("scripts/pages/*.js", { absolute: true });
  await esbuild.build({
    entryPoints: paths,
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "public/",
    entryNames: "[name].bundled",
  });
}

async function buildHeadless() {
  const entry = path.resolve(process.cwd(), 'headless/index.ts')
  console.log(entry)
  const output = await ncc(entry, {
    minify: true,
    sourceMapRegister: false,
    cache: false,
  })
  await fs.writeFile(path.resolve(process.cwd(), 'public/app/dash.headless.js'), output.code)

}

async function buildTracker() {
  console.log("Buildling Tracker...")
  const paths = await glob("tracker-src/src/App.js", { absolute: true });
  await esbuild.build({
    entryPoints: paths,
    bundle: true,
    minify: true,
    sourcemap: true,
    loader: {".js":"jsx"},
    outdir: "public/tracker/",
    entryNames: "tracker.bundled",
    external: ['react','react-dom']
  })
}
const build = async () => Promise.all([
  buildWeb(),
  buildHeadless(),
  buildTracker(),
])

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

