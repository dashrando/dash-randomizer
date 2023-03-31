import assert from 'node:assert'
import dotenv from 'dotenv'

dotenv.config()

const required = (name: string, val: string | undefined) =>
  assert(val, `${name} is not defined`)

const optional = (name: string, val: string | undefined) => {
  if (!val) {
    console.warn(`Warning: ${name} is not defined, some features may not work`)
  }
}

required('DISCORD_BOT_TOKEN', process.env.DISCORD_BOT_TOKEN)
required('DISCORD_CLIENT_ID', process.env.DISCORD_CLIENT_ID)
