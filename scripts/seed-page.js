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

function setupSeedUI() {
  document.addEventListener('seed:ready', (evt) => {
    const btnEl = document.getElementById('download-btn')
    btnEl.textContent = `Download ${evt.detail.name}`
    btnEl.disabled = false
    btnEl.addEventListener('click', () => {
      downloadFile(evt.detail.data, evt.detail.name)
    })

    const modeEl = document.getElementById('settings-mode')
    const mode = game_modes.find(({ name }) => name === evt.detail.mode)
    modeEl.textContent = mode.title

    const numEl = document.getElementById('settings-number')
    numEl.textContent = evt.detail.num
  })
}



(async () => {
  try {
    setupSeedUI()
    const { num, mode } = getSeedOpts()
    const vanillaBytes = await getVanillaBytes()
    const { data, name } = await RandomizeRom(num, mode, {}, { vanillaBytes })
    const readyEvt = new CustomEvent('seed:ready', { detail: { data, name, num, mode } })
    document.dispatchEvent(readyEvt)
    downloadFile(data, name)
  } catch (e) {
    console.error(e)
  }
})()
