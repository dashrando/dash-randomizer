import * as esbuild from 'esbuild'
import glob from 'glob'

async function build() {
  const paths = await glob('scripts/pages/*.js', { absolute: true })
  await esbuild.build({
    entryPoints: paths,
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'public/',
    entryNames: '[name].bundled',
  })
}

build()
  .then(() => {
    console.log('build successful')
    process.exit(0)
  })
  .catch((err) => {
    console.error('build failed')
    console.error(err)
    process.exit(1)
  })
