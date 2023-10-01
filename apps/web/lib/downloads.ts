import { saveAs } from 'file-saver'
import { get, set } from 'idb-keyval'

export function downloadFile(data: Uint8Array, filename: string, seedKey: string) {
  saveAs(new Blob([data!]), filename);
  // Save the seed's key to the browser
  const now = new Date()
  set(seedKey, now)
}

export const hasDownloadedSeed = async (seedKey: string) => {
  try {
    const hasDownloaded = await get(seedKey)
    if (hasDownloaded) {
      return true
    }
  } catch (_) {
    return false
  }
}
