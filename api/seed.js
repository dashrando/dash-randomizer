import { generateFromPreset } from "../scripts/lib/sm-rando";

export const config = {
  runtime: 'edge',
};

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
    return resJSON({ error: err.message }, 500);
  }
};
 
export default handler
