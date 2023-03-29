import fs from "node:fs"
import redirectTemplate, { seedRedirectTemplate } from "./template.mjs"

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
  let redirect = `https://www.dashrando.net/${fileName}`
  const template = (fileName === 'seed.html') ? seedRedirectTemplate : redirectTemplate
  const contents = template(redirect)
  fs.writeFileSync(`./redirect/public/${fileName}`, contents)
})
