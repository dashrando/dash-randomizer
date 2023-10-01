'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { bytesToParams, paramsToString, vanilla as vanillaData } from 'core'
import styles from './file-drop.module.css'
import { useRouter } from 'next/navigation'
import { useVanilla } from '../generate/vanilla'
import { toast } from 'sonner'

const getParamsFromFile = (bytes: Uint8Array) => {
  try {
    const offset = 0x2f8b00
    const paramBytes = bytes.subarray(offset, offset + 6)
    const byteParams = bytesToParams(paramBytes)
    const seedKey = paramsToString(
      byteParams.seed,
      byteParams.settings,
      byteParams.options
    )
    return seedKey
  } catch (e) {
    const err = e as Error;
    console.error(err.message)
    // TODO: Present a friendly error message to the user instead of an alert.
    alert(err.message)
    return null
  }
}

async function getVanilla(value: Uint8Array): Promise<any> {
  const { getSignature, isVerified, isHeadered } = vanillaData
  const signature = await getSignature(value)
  if (isVerified(signature)) {
    return new Uint8Array(value)
  }

  if (isHeadered(signature)) {
    console.warn(
      "You have entered a headered ROM. The header will now be removed."
    )
    const unheaderedContent = value.slice(512)
    return getVanilla(unheaderedContent)
  }

  throw Error("Vanilla Rom does not match checksum.")
}

function isDASHSeed(seed: Uint8Array): boolean {
  // Test if DASH seed by checking for "Super Metroid DASH" at 0x007FC0
  const offset = 0x007FC0
  const searchString = 'Super Metroid DASH'
  const searchBytes = new TextEncoder().encode(searchString)
  let found = true
  for (let i = 0; i < searchBytes.length; i++) {
    if (seed[offset + i] !== searchBytes[i]) {
      found = false
      break
    }
  }
  return found
}

const getFileContents = async (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = async function () {
      try {
        const bytes = new Uint8Array(reader.result as ArrayBuffer)
        resolve(bytes)
      } catch (e) {
        const err = e as Error
        console.error(err.message)
        // TODO: Present a friendly error message to the user instead of an alert.
        alert(err.message)
        reject(err)
      }
    }

    reader.onerror = function () {
      alert("Failed to load file.")
    }

    reader.readAsArrayBuffer(file)
  })
}

const FileDrop = (props: React.PropsWithChildren) => {
  const [active, setActive] = useState(false)
  const { data: vanillaDataSet, set: setVanilla } = useVanilla()
  const router = useRouter()

  const onDragEnter = useCallback((evt: Event) => {
    evt.preventDefault()
    evt.stopPropagation()
    setActive(true)
  }, [])

  const onDragLeave = useCallback((evt: any) => {
    evt.preventDefault()
    evt.stopPropagation()
    setActive(false)
  }, [])

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setActive(false)
    const file = acceptedFiles[0]
    const data = await getFileContents(file)
    
    try {
      const vanillaData = await getVanilla(data)
      if (vanillaData) {
        if (vanillaDataSet) {
          toast('Vanilla ROM already set')
          return null
        }
        await setVanilla(vanillaData)
        toast('Vanilla ROM loaded')
        return null
      }
    } catch (_) {
      // toast('you did not upload a vanilla rom')
      // return null
    }

    const isDASH = isDASHSeed(data)
    if (isDASH) {
      toast('Loading DASH seed...')
      const seedKey = getParamsFromFile(data)
      if (seedKey) {
        router.push(`/seed/${seedKey}`)
        return
      }
    }
    
    // Not a vanilla or DASH file
    toast.error(`Could not load seed`)
  }, [router, setActive, vanillaDataSet, setVanilla])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop,
    onDragLeave,
  })

  useEffect(() => {
    window.addEventListener('dragenter', onDragEnter, false)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
    }
  }, [onDragEnter])

  if (!active) {
    return null
  }

  return (
    <div {...getRootProps()} className={styles.backdrop}>
      <input {...getInputProps()} />
      <div className={styles.inner}>Drop your file here</div>
    </div>
  )
}

export default FileDrop
