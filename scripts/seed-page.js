function getSeedOpts() {
  const url = new URL(document.location)
  return {
    num: url.searchParams.get('num'),
    mode: url.searchParams.get('mode'),
  }
}

async function getVanillaBytes() {
  const data = await idbKeyval.get('vanilla-rom')
  if (!data) {
    throw Error('No vanilla ROM data found')
  }
  return data
}

function downloadFile(data, name) {
  saveAs(
    new Blob([data]),
    name
 )
}

(async () => {
  try {
    const { num, mode } = getSeedOpts()
    const vanillaBytes = await getVanillaBytes()
    const { data, name } = await RandomizeRom(num, mode, {}, { vanillaBytes })
    downloadFile(data, name)
  } catch (e) {
    console.error(e)
  }
})()
