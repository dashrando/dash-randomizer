'use client'

import useSWR from 'swr'
import { useDropzone } from 'react-dropzone'
import { get, set } from 'idb-keyval'
import { vanilla } from 'core'
import { useCallback } from 'react'
import useMounted from '../hooks/useMounted'
import styles from './vanilla.module.css'

async function parseContents(value: any): Promise<any> {
  const { getSignature, isVerified, isHeadered } = vanilla;
  const signature = await getSignature(value);
  if (isVerified(signature)) {
    return new Uint8Array(value)
  }

  if (isHeadered(signature)) {
    console.warn(
      "You have entered a headered ROM. The header will now be removed."
    );
    const unheaderedContent = value.slice(512);
    return parseContents(unheaderedContent);
  }

  throw Error("Vanilla Rom does not match checksum.");
}

async function fetcher() {
  console.debug('fetcher')
  try {
    let vanilla = await get('vanilla-rom')
    if (vanilla instanceof ArrayBuffer) {
      vanilla = new Uint8Array(vanilla);
    }
    return vanilla
  } catch (e) {
    const err = e as Error
    console.error('Vanilla ROM Error', err.message)
    // This happens when a user deletes the IndexedDB database.
    // Refreshing the page works for whatever reason.
    window.location.reload()
  }
}


export const useVanilla = () => {
  const mounted = useMounted()
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    mounted ? 'vanilla-rom' : null,
    fetcher,
    {
      revalidateIfStale: false,
    }
  )

  const setVanilla = useCallback(async (value: any) => {
    // TODO: validate value
    await set('vanilla-rom', value)
    mutate()
  }, [mutate])
  return {
    data,
    set: setVanilla,
    isLoading,
    isReady: !isLoading && !isValidating,
    error,
  }
}

const setVanillaFile = async (file: any, set: any) => {
  let reader = new FileReader();
  
  reader.onload = async function () {
    try {
      const bytes = await parseContents(reader.result);
      await set(bytes);
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      // TODO: Present a friendly error message to the user instead of an alert.
      alert(err.message);
    }
  };

  reader.onerror = function () {
    alert("Failed to load file.");
  };

  reader.readAsArrayBuffer(file);
}

export default function VanillaButton() {
  const { set, isLoading } = useVanilla()

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0]
    setVanillaFile(file, set)
  }, [set])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "application/octet-stream": [".smc", ".sfc"],
      "application/binary": [".smc", ".sfc"],
    },
    useFsAccessApi: false,
  })

  return (
    <div>
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className={styles.wrapper}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            Upload Vanilla ROM
          </div>
        </div>
        <p>You must set the vanilla ROM in order to be able to generate a randomized seed.</p>
      </div>
    </div>
  )
}
