'use client'

import useSWR from 'swr'
import { get, set } from 'idb-keyval'
import { ButtonFileInput } from '@/app/components/button'
import { vanilla } from 'core'

async function parseContents(value: any) {
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
  reader.readAsArrayBuffer(vanillaRom);

  reader.onload = async function () {
    try {
      await parseContents(reader.result);
      await callback(reader.result);
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      alert(err.message);
      el.value = "";
    }
  };

  reader.onerror = function () {
    alert("Failed to load file.");
  };
}


export const useVanilla = () => {
  const { data, isLoading, error, mutate } = useSWR('vanilla-rom', () => get('vanilla-rom'))
  return {
    data,
    set: async (value: any) => {
      // TODO: validate value
      await set('vanilla-rom', value)
      await mutate()
    },
    isLoading,
    error,
  }
}

export default function VanillaButton() {
  const { data, set } = useVanilla()
  return (
    <div>
      {!data ? (
        <>
          <ButtonFileInput
            label="Upload Vanilla ROM"
            id="vanilla-file-input"
            name="vanilla-file"
            onChange={(e: Event) => {
              const target = e.target as HTMLInputElement
              inputVanillaRom(target, async (value) => {
                await set(value)
              })
            }}
          />
          <p>You must set the vanilla ROM in order to be able to generate a randomized seed.</p>
        </>
      ): (
        <p>Vanilla ROM is set.</p>
      )}
    </div>
  )
}
