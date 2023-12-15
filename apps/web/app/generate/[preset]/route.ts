import { NextRequest } from "next/server";
import { getAllPresets, getPreset, getSeedNumber, paramsToString } from "core";

export const runtime = "edge";

export type HTTPError = Error & { status?: number };

type GenerateParams = {
  preset: string
}

export async function GET(req: NextRequest, { params }: { params: GenerateParams} ) {
   try {
    const seedNum = getSeedNumber();
    const preset = getPreset(params.preset);

    if (preset == undefined) {
      const validPresets = getAllPresets()
        .map(p => p.tags)
        .reduce((acc, cur) => {
        return acc.concat(cur)
      }, []);
      const msg = `Invalid preset. Valid presets are: ${validPresets
        .slice(0, -1)
        .join(", ")} or ${validPresets.slice(-1)}`;
      const err = new Error(msg) as HTTPError;
      err.status = 422;
      throw err;
    }
    
    const defaultOptions = {
      DisableFanfare: 0,
      RaceMode: 0,
    };
    const hash = paramsToString(seedNum, preset.settings, defaultOptions);
    const url = new URL(`seed/${hash}`, req.nextUrl.origin);
    return new Response(url.toString(),
      { status: 307, headers: {Location: url.toString()} });
   } catch (err: unknown) {
    console.error(err);
    const error = err as HTTPError;
    const status = error.status || 500;
    return new Response(error.message, { status } );
   }
}