'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import {
  encodeSeed,
  isDASHSeed,
  readRom,
  readSeedKey,
  vanilla as vanillaData,
} from "core";
import styles from './file-drop.module.css'
import { useRouter } from 'next/navigation'
import { useVanilla } from '../generate/vanilla'
import { toast } from 'sonner'
import { getNewSeedKey, getSeedData, saveSeedData } from '@/lib/seed-data';

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

    if (!isDASHSeed(data)) {
      // Not a vanilla or DASH file
      toast.error(`Not vanilla ROM or DASH seed`)
      return
    }

    // Try to read a seed key from the ROM and load it
    const { key, race } = readSeedKey(data);
    if (key.length > 0) {
      const data = await getSeedData(key)
      if (data != null) {
        toast('Loading DASH seed...')
        router.push(`/seed/${key}`)
        return
      }
    }

    // No seed key so try to read the parameters from the 
    // ROM and regenerate it; does not work for race seeds
    if (!race) {
      const { params, graph } = readRom(data);
      if (params !== undefined && graph !== undefined) {
        const hash = encodeSeed(params, graph)
        const seedKey = key.length > 0 ? key : await getNewSeedKey()
        await saveSeedData(
          seedKey,
          hash,
          params.options.Mystery,
          false,
          params.options.Spoiler
        );
        toast('Loading DASH seed...')
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
