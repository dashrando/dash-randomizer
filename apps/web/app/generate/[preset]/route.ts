import { NextRequest } from "next/server"
import { getAllPresets, getPreset, getSeedNumber, paramsToString } from "core"
import { customAlphabet } from 'nanoid'
import { kv } from '@vercel/kv'
import { getSpoiler } from "@/lib/spoiler"

export const runtime = "nodejs"

export type HTTPError = Error & { status?: number }

type GenerateParams = {
  preset: string
}

const redirect = (url: URL) => (
  new Response(url.toString(), {
    status: 307,
    headers: {
      Location: url.toString()
    }
  })
)

export async function GET(req: NextRequest, { params }: { params: GenerateParams} ) {
   const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)

   try {
    const seedNum = getSeedNumber()
    const preset = getPreset(params.preset)
    const mystery = preset?.tags.includes('mystery')
    const searchParams = req.nextUrl.searchParams
    const spoiler = searchParams.get('spoiler') || 0
    const race = mystery ? 1 : searchParams.get('race') || 0

    if (preset == undefined) {
      const validPresets = getAllPresets()
        .map(p => p.tags)
        .reduce((acc, cur) => {
        return acc.concat(cur)
      }, ['mystery']);
      const msg = `Invalid preset. Valid presets are: ${validPresets
        .slice(0, -1)
        .join(", ")} or ${validPresets.slice(-1)}`
      const err = new Error(msg) as HTTPError
      err.status = 422
      throw err
    }

    if (spoiler && !race) {
      const err = new Error('Spoilers are currently only valid for race seeds') as HTTPError
      err.status = 422
      throw err
    }

    if (race) {
      const hash = paramsToString(seedNum, preset.settings, preset.options)
      const raceObj = {
        key: nanoid(),
        hash,
        mystery,
        spoiler: spoiler ? getSpoiler(hash) : null
      }
      await kv.hset(`race-${raceObj.key}`, raceObj)
      const url = new URL(`race/${raceObj.key}`, req.nextUrl.origin)
      return redirect(url)
    }
    
    const hash = paramsToString(seedNum, preset.settings, preset.options)
    const url = new URL(`seed/${hash}`, req.nextUrl.origin)
    return redirect(url)
   } catch (err: unknown) {
    console.error(err)
    const error = err as HTTPError
    const status = error.status || 500
    return new Response(error.message, { status } )
   }
}
