class VanillaROMStorage {
  constructor() {
    if (!this.supported) {
      console.warn('IndexedDb not supported')
      return false
    }
    const self = this;

    document.addEventListener('vanillaRom:input', async (evt) => {
      await self.setValue(evt.detail.data)
    })

    document.addEventListener('vanillaRom:clear', async (evt) => {
      await self.clearValue()
    })
    
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        const data = await idbKeyval.get('vanilla-rom')
        const valid = await self.verifyData(data)
        if (!valid) {
          return self.clearValue()
        }
        const dispatchEvt = new CustomEvent('vanillaRom:set', {
          detail: {
            data
          }
        })
        document.dispatchEvent(dispatchEvt)
      } catch (e) {
        self.clearValue()
      }
    })
  }

  async clearValue() {
    await idbKeyval.del('vanilla-rom')
    const dispatchEvt = new CustomEvent('vanillaRom:cleared')
    document.dispatchEvent(dispatchEvt)
  }

  async setValue(value) {
    await idbKeyval.set('vanilla-rom', value)
    const dispatchEvt = new CustomEvent('vanillaRom:set', {
      detail: {
        data: value
      }
    })
  document.dispatchEvent(dispatchEvt)
  }

  supported() {
    return ('indexedDB' in window)
  }

  async verifyData(value) {
    if (!value) {
      return false
    }
    const signature = await window.crypto.subtle.digest("SHA-256", value);
    return (
      ToHexString(new Uint8Array(signature)) ==
      "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72"
    )
  }
}

function clearVanillaRom() {
  const dispatchEvt = new CustomEvent('vanillaRom:clear')
  document.dispatchEvent(dispatchEvt)
}

new VanillaROMStorage()
