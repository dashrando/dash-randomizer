import { generateFromPreset } from "core";

export const config = {
  runtime: 'edge',
};

const validPresets = [
  'recall_mm', 'recall_full', 'standard_mm', 'standard_full',
]

const resJSON = (data, status = 200, headers = {}) => (
  new Response(
    JSON.stringify(data),
    {
      status,
      headers,
    }
  )
)

const handler = async (req) => {
  try {
    const body = await req.json();
    if (!body.preset) {
      throw new Error('Missing preset');
    }
    const { preset } = body
    const isValidPreset = validPresets.includes(preset)
    if (!isValidPreset) {
      const msg = `Invalid preset. Valid presets are: ${validPresets.slice(0, -1).join(', ')} or ${validPresets.slice(-1)}`
      const err = new Error(msg);
      err.status = 422;
      throw err;
    }
    const [basePatchUrl, seedPatch, fileName] = await generateFromPreset(preset)
    return resJSON({
      basePatchUrl,
      seedPatch,
      fileName,
      preset,
    }, 200, {
      'Cache-Control': 's-maxage=86400',
      'Content-Type': 'application/json',
    })
  } catch (err) {
    console.error(err)
    const status = err.status || 500;
    return resJSON({ error: err.message }, status);
  }
};
 
export default handler
