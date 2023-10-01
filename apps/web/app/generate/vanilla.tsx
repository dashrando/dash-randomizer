'use client'

import useSWR from 'swr'
import Button from '../components/button'
import { get, set } from 'idb-keyval'
import { vanilla } from 'core'
import { cn } from '@/lib/utils'
import { useCallback, useRef } from 'react'
import { toast } from 'sonner'
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
  const { data, isLoading, error, mutate } = useSWR('vanilla-rom',
    fetcher,
    {
      revalidateIfStale: false,
    }
  )

  const setVanilla = useCallback(async (value: any) => {
    await set('vanilla-rom', value)
    mutate()
  }, [mutate])
  return {
    data,
    set: setVanilla,
    refresh: mutate,
    isLoading,
    error,
  }
}

const setVanillaFile = async (file: any, set: any) => {
  let reader = new FileReader();
  
  reader.onload = async function () {
    try {
      const bytes = await parseContents(reader.result)
      await set(bytes)
      toast('Vanilla ROM loaded')
    } catch (e) {
      const err = e as Error
      console.error(err.message);
      toast.error(err.message);
    }
  };

  reader.onerror = function () {
    toast.error("Failed to load file.");
  };

  reader.readAsArrayBuffer(file);
}

export default function VanillaButton() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, set, isLoading } = useVanilla()

  const handleClick = (evt: any) => {
    evt.preventDefault()
    if (inputRef.current) {
      inputRef.current?.click()
    }
  };

  const handleFileChange = useCallback((evt: any) => {
    const file = evt.target.files[0]
    setVanillaFile(file, set)
  }, [set])

  // If the vanilla file has been loaded
  // or if the form is loading
  // then hide the button
  const shouldHide = data || (isLoading && !data)

  return (
    <div className={styles.vanilla}>
      <div className={cn(shouldHide && styles.loading)}>
        <Button variant="secondary" onClick={handleClick}>
          Upload Vanilla ROM
        </Button>
        <p>You must set the <a href="/info/settings#vanilla">Vanilla ROM</a> in order to be able to generate a randomized seed.</p>
        <input ref={inputRef} type="file" onChange={handleFileChange} />
      </div>
    </div>
  )
}
