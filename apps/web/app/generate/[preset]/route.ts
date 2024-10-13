import { NextRequest } from "next/server"
import { encodeSeedAsString, getAllPresets, getPreset, getSeedNumber } from "core"
import { generateSeed } from "core/data"
import { getNewSeedKey, saveSeedData } from "@/lib/seed-data"

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
   try {
    const seed = getSeedNumber()
    const preset = getPreset(params.preset)
    const mystery = preset?.tags.includes('mystery') || false
    const searchParams = req.nextUrl.searchParams
    const spoiler = searchParams.get('spoiler') || 0

    const isRace = () => {
      if (mystery) {
        return true
      }
      const raceParam = searchParams.get('race')
      if (raceParam) {
        return parseInt(raceParam) === 1
      }
      return false
    }

    const race = isRace()

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

    const { settings, options } = preset;
    options.Spoiler = spoiler ? true : false;
    
    const graph = generateSeed(seed, settings, options);
    const hash = encodeSeedAsString({ seed, settings, options }, graph)

    const seedKey = await getNewSeedKey()
    await saveSeedData(
      seedKey,
      hash,
      mystery,
      race,
      options.Spoiler
    )

    const url = new URL(`seed/${seedKey}`, req.nextUrl.origin)
    return redirect(url)
   } catch (err: unknown) {
    console.error(err)
    const error = err as HTTPError
    const status = error.status || 500
    return new Response(error.message, { status } )
   }
}
