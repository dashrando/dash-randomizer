'use client'

import useSWR from 'swr'
import { get, set, del } from 'idb-keyval'
import { Button, ButtonFileInput } from '@/app/components/button'
import { vanilla } from 'core'
import { useCallback } from 'react'

async function parseContents(value: any): Promise<any> {
  const { getSignature, isVerified, isHeadered } = vanilla;
  const signature = await getSignature(value);
  if (isVerified(signature)) {
    return value
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

function inputVanillaRom(el: HTMLInputElement, callback: (value: any) => void) {
  if (!el || !el.files) {
    return;
  }
  let vanillaRom = el.files[0];
  let reader = new FileReader();
  
  reader.onload = async function () {
    try {
      await parseContents(reader.result);
      await callback(reader.result);
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      // TODO: Present a friendly error message to the user instead of an alert.
      alert(err.message);
      el.value = "";
    }
  };

  reader.onerror = function () {
    alert("Failed to load file.");
  };

  reader.readAsArrayBuffer(vanillaRom);
}

async function fetcher() {
  try {
    const vanilla = await get('vanilla-rom')
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
  const { data, isLoading, error, mutate } = useSWR('vanilla-rom', fetcher)
  return {
    data,
    set: async (value: any) => {
      // TODO: validate value
      await set('vanilla-rom', value)
      mutate()
    },
    isLoading,
    error,
  }
}

export default function VanillaButton() {
  const { data, set, isLoading } = useVanilla()
  
  const onChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement
    inputVanillaRom(target, async (value) => {
      await set(value)
    })
  }, [set])

  return (
    <div>
      {data && !isLoading ? (
        <div>
          <Button
            onClick={(evt) => {
              evt.preventDefault()
              console.log('download seed')
            }
          }>
            Download Seed
          </Button>
        </div>
      ) : (
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          <ButtonFileInput
            label="Upload Vanilla ROM"
            id="vanilla-file-input"
            name="vanilla-file"
            onChange={onChange}
          />
          <p>You must set the vanilla ROM in order to be able to generate a randomized seed.</p>
        </div>
      )}
    </div>
  )
}
