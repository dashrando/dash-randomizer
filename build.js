import * as esbuild from "esbuild";
import glob from "glob";

async function build() {
   const paths = await glob("scripts/pages/*.js", { absolute: true });
   await esbuild.build({
      entryPoints: paths,
      bundle: true,
      minify: true,
      sourcemap: true,
      outdir: "public/",
      entryNames: "[name].bundled",
   });
   const cliPath = await glob("scripts/lib/dash-cli.js", { absolute: true });
   await esbuild.build({
      entryPoints: cliPath,
      platform: "node",
      bundle: true,
      minify: true,
      sourcemap: true,
      conditions: [],
      outdir: "public/app/",
      entryNames: "[name].bundled",
   });
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
