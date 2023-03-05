function getSeedKey() {
  const url = new URL(document.location)
  return url.searchParams.get('s')
}

async function fetchPatch(key) {
  const url = `https://dash-synack.vercel.app/seed/${key}`
  const response = await fetch(url)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  const data = await response.arrayBuffer()
  return await parsePatch(data)
}

async function parsePatch(patch) {
  const bytes = new Uint8Array(patch);

  if (!BpsPatch.IsBpsPatch(bytes)) {
    throw Error('Not a BPS patch');
  }

  return new BpsPatch(bytes);
}

async function getVanillaData() {
  const data = await idbKeyval.get('vanilla-rom')
  if (!data) {
    throw Error('No vanilla ROM data found')
  }
  return data
}

async function applyPatch(patch, vanillaData) {
  return patch.Apply(vanillaData)
}

function downloadFile(data, name) {
  saveAs(
    new Blob([data]),
    name
 )
}

(async () => {
  try {
    const name = getSeedKey()
    const patch = await fetchPatch(name)
    const vanillaData = await getVanillaData()
    const patchedData = await applyPatch(patch, vanillaData)
    // downloadFile(patchedData, name)
  } catch (e) {
    console.error(e)
  }
})()
