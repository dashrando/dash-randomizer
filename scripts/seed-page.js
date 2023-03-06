function getSeedOpts() {
  const url = new URL(document.location)
  return {
    num: url.searchParams.get('num'),
    mode: url.searchParams.get('mode'),
    download: url.searchParams.get('download') !== null,
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
    if (evt.detail.autoDownload) {
      btnEl.classList.add('downloading')
      btnEl.textContent = `Downloading...`
      btnEl.disabled = true
    } else {
      btnEl.textContent = `Download ${evt.detail.name}`
      btnEl.disabled = false
    }
    btnEl.addEventListener('click', () => {
      downloadFile(evt.detail.data, evt.detail.name)
    })

    const modeEl = document.getElementById('settings-mode')
    const mode = game_modes.find(({ name }) => name === evt.detail.mode)
    modeEl.textContent = mode.title

    const numEl = document.getElementById('settings-number')
    numEl.textContent = evt.detail.num

    const seedEl = document.getElementById('seed-container')
    seedEl.classList.add('loaded')
  })

  document.addEventListener('seed:download', (evt) => {
    const btnEl = document.getElementById('download-btn')
    btnEl.textContent = `Download ${evt.detail.name}`
    btnEl.disabled = false 
    btnEl.classList.remove('downloading')
  })
}



(async () => {
  try {
    setupSeedUI()
    const { num, mode, download: autoDownload } = getSeedOpts()
    const vanillaBytes = await getVanillaBytes()
    const { data, name } = await RandomizeRom(num, mode, {}, { vanillaBytes })
    const readyEvt = new CustomEvent('seed:ready', { detail: { data, name, num, mode, autoDownload } })
    document.dispatchEvent(readyEvt)

    if (autoDownload) {
      setTimeout(() => {
        downloadFile(data, name)
        const downloadEvt = new CustomEvent('seed:download', { detail: { name } })
        document.dispatchEvent(downloadEvt)
      }, 850)
    }
  } catch (e) {
    console.error(e)
  }
})()
