'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { bytesToParams, paramsToString } from 'core'
import styles from './file-drop.module.css'
import { useRouter } from 'next/navigation'

const getParamsFromFile = async (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

  reader.onload = async function () {
    try {
      const offset = 0x2f8b00
      const bytes = new Uint8Array(reader.result as ArrayBuffer)
      const paramBytes = bytes.subarray(offset, offset + 6)
      const byteParams = bytesToParams(paramBytes)
      const seedKey = paramsToString(
        byteParams.seed,
        byteParams.mapLayout,
        byteParams.itemPoolParams,
        byteParams.settings,
        byteParams.options
      )
      resolve(seedKey)
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      // TODO: Present a friendly error message to the user instead of an alert.
      alert(err.message);
      reject(err)
    }
  };

  reader.onerror = function () {
    alert("Failed to load file.");
  };

  reader.readAsArrayBuffer(file);
  })
}

const FileDrop = (props: React.PropsWithChildren) => {
  const [active, setActive] = useState(false)
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
    // if vanilla, set vanilla if not set
    // if seed, go to seed page
    const seedKey = await getParamsFromFile(file)
    if (seedKey) {
      router.push(`/seed/${seedKey}`)
    }
  }, [router, setActive])

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
