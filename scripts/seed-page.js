// These signatures are taken from:
// https://github.com/dashrando/dash-template-asm/blob/main/src/fileselect/gameoptions.asm#L85-L117
const SIGNATURE_VALUES = [
  "GEEMER  ",
  "RIPPER  ",
  "ATOMIC  ",
  "POWAMP  ",
  "SCISER  ",
  "NAMIHE  ",
  "PUROMI  ",
  "ALCOON  ",
  "BEETOM  ",
  "OWTCH   ",
  "ZEBBO   ",
  "ZEELA   ",
  "HOLTZ   ",
  "VIOLA   ",
  "WAVER   ",
  "RINKA   ",
  "BOYON   ",
  "CHOOT   ",
  "KAGO    ",
  "SKREE   ",
  "COVERN  ",
  "EVIR    ",
  "TATORI  ",
  "OUM     ",
  "PUYO    ",
  "YARD    ",
  "ZOA     ",
  "FUNE    ",
  "GAMET   ",
  "GERUTA  ",
  "SOVA    ",
  "BULL    ",
]

function getSeedOpts() {
  const url = new URL(document.location)
  return {
    seed: url.searchParams.get('seed'),
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

    const signatureEl = document.getElementById('seed-signature')
    signatureEl.textContent = evt.detail.signature

    const modeEl = document.getElementById('settings-mode')
    const mode = game_modes.find(({ name }) => name === evt.detail.mode)
    modeEl.textContent = mode.title

    const seedEl = document.getElementById('settings-seed')
    seedEl.textContent = evt.detail.seed.padStart(6, '0')

    const containerEl = document.getElementById('seed-container')
    containerEl.classList.add('loaded')
  })

  document.addEventListener('seed:download', (evt) => {
    const btnEl = document.getElementById('download-btn')
    btnEl.textContent = `Download ${evt.detail.name}`
    btnEl.disabled = false 
    btnEl.classList.remove('downloading')
  })
}

function fetchSignature(data) {
  // the signature is stored in 4 bytes at 0x2f8000 - 0x2f8003
  // use bit mask of 0x1f to get the index in the signatures array
  // then trim the string to remove the extra spaces
  const mask = 0x1f
  const addresses =
    [0x2f8000, 0x2f8001, 0x2f8002, 0x2f8003]
    .map((addr) => data[addr] & mask)
    .map((index) => SIGNATURE_VALUES[index].trim())
  return addresses.join(' ')
}

(async () => {
  try {
    setupSeedUI()
    const { seed, mode, download: autoDownload } = getSeedOpts()
    const vanillaBytes = await getVanillaBytes()
    const { data, name } = await RandomizeRom(seed, mode, {}, { vanillaBytes })
    const signature = fetchSignature(data)
    const readyEvt = new CustomEvent('seed:ready', { detail: { data, name, seed, mode, autoDownload, signature } })
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
