import type { NextRequest } from "next/server";
import { generateFromPreset, getAllPresets } from "core";

export const runtime = "nodejs";

export type HTTPError = Error & { status?: number };

const resJSON = (data: any, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers,
  });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.preset) {
      throw new Error("Missing preset");
    }
    const { preset, seedNumber } = body;
    const validPresets = getAllPresets().map(p => p.tags).reduce((acc, cur) => {
      return acc.concat(cur)
    }, []);
    const isValidPreset = validPresets.includes(preset);
    if (!isValidPreset) {
      const msg = `Invalid preset. Valid presets are: ${validPresets
        .slice(0, -1)
        .join(", ")} or ${validPresets.slice(-1)}`;
      const err = new Error(msg) as HTTPError;
      err.status = 422;
      throw err;
    }
    const [basePatchUrl, seedPatch, fileName] = await generateFromPreset(
      preset,
      seedNumber
    );
    return resJSON(
      {
        basePatchUrl,
        seedPatch,
        fileName,
        preset,
      },
      200,
      {
        "Cache-Control": "s-maxage=86400",
        "Content-Type": "application/json",
      }
    );
  } catch (err: unknown) {
    console.error(err);
    const error = err as HTTPError;
    const status = error.status || 500;
    return resJSON({ error: error.message }, status);
  }
}
