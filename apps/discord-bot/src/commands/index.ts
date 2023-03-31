import fs from 'node:fs'
import path from 'node:path'
import { CommandFile } from '../types'
import { isJsOrTsFile } from '../util'

export const slashCommands = fs
  .readdirSync(path.resolve(__dirname, './'))
  .filter(isJsOrTsFile)
  .filter((file) => file !== 'index.ts')
  .map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { slashCommand } = require(`./${file}`) as CommandFile;
    return slashCommand
  })
