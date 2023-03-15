import fs from "node:fs"
import redirectTemaplte from "./template.mjs"

const redirectPaths = [
  'generate.html',
  'index.html',
  'readable-logic.html',
  'resources.html',
  'seed.html',
  'sgl2020.html',
  'sm_multi_tracker.html',
  'tournament.html',
  'updates.html',
]

redirectPaths.forEach((fileName) => {
  const redirect = `https://www.dashrando.net/${fileName}`
  fs.writeFileSync(`./redirect/public/${fileName}`, redirectTemaplte(redirect))
})
