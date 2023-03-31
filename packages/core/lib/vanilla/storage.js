import { get, set, del } from 'idb-keyval'
import verifyVanillaRom from './verify';

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
    
    this.initialize()
  }

  async initialize() {
    const self = this
    try {
      const data = await get('vanilla-rom')
      if (!data) {
        return
      }
      
      const valid = await verifyVanillaRom(data)
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
      console.error(e)
      self.clearValue()
    }
  }

  async clearValue() {
    await del('vanilla-rom')
    const dispatchEvt = new CustomEvent('vanillaRom:cleared')
    document.dispatchEvent(dispatchEvt)
  }

  async setValue(value) {
    await set('vanilla-rom', value)
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

}

export function clearVanillaRom() {
  const dispatchEvt = new CustomEvent('vanillaRom:clear')
  document.dispatchEvent(dispatchEvt)
}

export const getVanilla = async () => await get('vanilla-rom')

export default VanillaROMStorage
