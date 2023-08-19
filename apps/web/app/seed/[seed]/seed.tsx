'use client'

import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import useMounted from '@/app/hooks/useMounted'
import { useVanilla } from '@/app/generate/vanilla'
import styles from './seed.module.css'
import { RandomizeRom, fetchSignature, findPreset } from 'core'
import { cn } from '@/lib/utils'
import Button from '@/app/components/button'

function downloadFile(data: any, name: string) {
  saveAs(new Blob([data]), name)
}

type Seed = {
  data: any
  name: string
}

export default function Seed({ parameters }: any) {
  const mounted = useMounted()
  const { data: vanilla, isLoading } = useVanilla()
  const [seed, setSeed] = useState<Seed|null>(null)
  const [signature, setSignature] = useState<string|null>('BEETOM BULL YARD GAMET')

  useEffect(() => {
    if (mounted) {
      if (!isLoading) {
        if (vanilla) {
          console.log('vanilla loaded')
        } else {
          console.log('vanilla not loaded')
        }
      }
      // Check for all params (server)
      // Check for vanilla (client)
    
      // Randomize ROM (server)
      // Fetch signature (server)
      // Patch and set (server)
      
      // Auto-download by default (client)
    }
  }, [isLoading, mounted, parameters, vanilla])

  useEffect(() => {
    const initialize = async () => {
      if (vanilla) {
        const { seed: seedNum, mapLayout, itemPoolParams, settings, options } = parameters
        const preset = findPreset({ mapLayout, itemPoolParams, settings })
        if (preset != undefined && preset.settings != undefined) {
          settings.preset = preset.settings.preset
        } else {
          settings.preset = "Custom"
        }
        const seedData = await RandomizeRom(seedNum, mapLayout, itemPoolParams, settings, options, {
          vanillaBytes: vanilla,
        })
        const signature = fetchSignature(seedData.data)
        setSignature(signature)
        setSeed(seedData)
      }
    }
    initialize()
  }, [isLoading, mounted, parameters, vanilla])

  const hasVanilla = Boolean(vanilla)

  if (isLoading || !mounted) {
    return null
  }

  return (
    <div>
      <div className={cn(styles.signature, !vanilla && styles.noVanilla)}>{signature}</div>
      <div className={styles.download}>
        {hasVanilla ? (
          <Button onClick={(evt) => {
            evt.preventDefault()
            // TODO: Refactor to show loading state if still getting seed
            if (seed) {
              downloadFile(seed?.data, seed?.name)
            }
          }}>Download {seed?.name}</Button>
        ) : <Button variant="secondary">Upload Vanilla</Button>}
      </div>
      {/* <Settings /> */}
    </div>
  )
}

// useEffect(() => {
//   async function startup() {
//     try {
//       new vanilla.vanillaROM();
//       const{ seed, mapLayout, itemPoolParams, settings, options } = stringToParams(params.seed);
//       Object.assign(settings, {preset: "Custom"});
//       if (!seed || !mapLayout || !itemPoolParams || !settings || !options) {
//         const missingEvt = new CustomEvent("seed:params-missing");
//         document.dispatchEvent(missingEvt);
//         return null;
//       }

//       const vanillaBytes = await vanilla.getVanilla();
//       if (!vanillaBytes) {
//         const vanillaEvt = new CustomEvent("seed:vanilla-missing", {
//           detail: { seed, mapLayout, itemPoolParams, settings, options },
//         });
//         document.dispatchEvent(vanillaEvt);
//         return null;
//       }
//       const { data, name } = (await RandomizeRom(
//         seed, mapLayout, itemPoolParams, settings, options, {
//         vanillaBytes,
//       })) as { data: any; name: string };
//       const signature = fetchSignature(data);
//       const autoDownload = !searchParams.get('download')
//       const readyEvt = new CustomEvent("seed:ready", {
//         detail: { data, name, seed, mapLayout, itemPoolParams,
//                   settings, options, autoDownload, signature },
//       });
//       document.dispatchEvent(readyEvt);

//       if (autoDownload) {
//         setTimeout(() => {
//           downloadFile(data, name);
//           const downloadEvt = new CustomEvent("seed:download", {
//             detail: { name },
//           });
//           document.dispatchEvent(downloadEvt);
//         }, 850);
//       }
//     } catch (e) {
//       const message = (e as Error).message;
//       console.error(message);
//     }
//   }

//   document.addEventListener("seed:params-missing", (_) => {
//     setContainerClass("params-missing");
//   });

//   document.addEventListener("seed:vanilla-missing", (evt: any) => {
//     const { seed, mapLayout, itemPoolParams, settings, options } = evt.detail;
//     setPageSettings({
//       seedNum: seed,
//       mapLayout: mapLayout,
//       itemPoolParams: itemPoolParams,
//       settings: {...settings, preset: "Custom"},
//       options: options
//     });
//     setContainerClass("vanilla-missing loaded");

//     document.addEventListener("vanillaRom:set", async (evt: any) => {
//       const vanillaBytes = evt.detail.data;
//       const { data, name } = (await RandomizeRom(seed, mapLayout,
//         itemPoolParams, settings, options, {
//         vanillaBytes,
//       })) as { data: any; name: string };
//       const signature = fetchSignature(data);
//       setSignature(signature);
//       setRomData({ data: data, name: name });
//       setContainerClass("loaded");
//       downloadFile(data, name);
//     });
//   });

//   document.addEventListener("seed:ready", (evt: any) => {
//     if (evt.detail.autoDownload) {
//       setDownloading(true);
//     }
//     setRomData({ data: evt.detail.data, name: evt.detail.name });
//     const { seed, mapLayout, itemPoolParams, settings, options } = evt.detail;
//     setPageSettings({
//       seedNum: seed,
//       mapLayout: mapLayout,
//       itemPoolParams: itemPoolParams,
//       settings: settings,
//       options: options
//     });
//     setSignature(evt.detail.signature);
//     setContainerClass("loaded");
//   });

//   document.addEventListener("seed:download", (evt: any) => {
//     setDownloading(false);
//   });

//   startup();
// }, [params.seed, searchParams]);