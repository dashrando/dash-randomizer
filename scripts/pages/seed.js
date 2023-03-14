import game_modes from '../data/modes';
import RandomizeRom from '../lib/randomize';
import { saveAs } from 'file-saver';
import vanillaROM, { getVanilla } from '../lib/vanilla/storage';
import inputVanillaRom from '../lib/vanilla/input';

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

function downloadFile(data, name) {
  saveAs(
    new Blob([data]),
    name
 )
}

function updateMode(value) {
  const modeEl = document.getElementById('settings-mode')
  const mode = game_modes.find(({ name }) => name === value)
  modeEl.textContent = mode.title
}

function updateSeedNumber(value) {
  const seedEl = document.getElementById('settings-seed')
  seedEl.textContent = value.padStart(6, '0')
}

function updateSignature(value) {
  const signatureEl = document.getElementById('seed-signature')
  signatureEl.textContent = value
}

function setupSeedUI(seed, mode) {
  document.addEventListener('seed:params-missing', (evt) => {
    const seedEl = document.getElementById('seed-container')
    seedEl.classList.add('params-missing')
  })

  document.addEventListener('seed:vanilla-missing', (evt) => {
    updateMode(evt.detail.mode)
    updateSeedNumber(evt.detail.seed)
    const seedEl = document.getElementById('seed-container')
    seedEl.classList.add('vanilla-missing')
    seedEl.classList.add('loaded')

    document.addEventListener('vanillaRom:set', async (evt) => {
      const vanillaBytes = evt.detail.data
      const { data, name } = await RandomizeRom(seed, mode, {}, { vanillaBytes })
      const signature = fetchSignature(data)
      updateSignature(signature)

      const btnEl = document.getElementById('download-btn')
      btnEl.textContent = `Download ${name}`
      btnEl.disabled = false
      btnEl.addEventListener('click', () => {
        downloadFile(data, name)
      })
      const seedEl = document.getElementById('seed-container')
      seedEl.classList.remove('vanilla-missing')
      downloadFile(data, name)
    })

    const vanillaEl = document.getElementById('vanilla-file-input')
    vanillaEl.addEventListener('change', (evt) => {
      inputVanillaRom(evt.target)
    })
  })

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

    updateSignature(evt.detail.signature)
    updateMode(evt.detail.mode)
    updateSeedNumber(evt.detail.seed)

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
    new vanillaROM()
    const { seed, mode, download: autoDownload } = getSeedOpts()
    setupSeedUI(seed, mode)
    if (!seed || !mode) {
      const missingEvt = new CustomEvent('seed:params-missing')
      document.dispatchEvent(missingEvt)
      return null
    }

    const vanillaBytes = await getVanilla()
    if (!vanillaBytes) {
      const vanillaEvt = new CustomEvent('seed:vanilla-missing', { detail: { seed, mode }})
      document.dispatchEvent(vanillaEvt)
      return null
    }
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
    console.error(e.message)
  }
})()
