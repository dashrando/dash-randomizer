'use client'

import { useEffect, useState } from 'react'
import useMounted from '@/app/hooks/useMounted'
import { useVanilla } from '@/app/generate/vanilla'
import styles from './seed.module.css'
import { RandomizeRom, findPreset } from 'core'
import { cn } from '@/lib/utils'
import { downloadFile } from '@/lib/downloads'
import Button from '@/app/components/button'
import { useSearchParams } from 'next/navigation'
import { get as getKey } from 'idb-keyval'
import { ArrowDown, ExternalLink } from 'react-feather'
import VanillaButton from '@/app/generate/vanilla'
import { parseSettings } from '@/lib/settings'


type Seed = {
  data: any
  name: string
}

const Parameters = ({ title, items }: { title: string, items: any[] }) => {
  return (
    <section className={styles.parameters}>
      <h4 className={styles.heading}>{title}</h4>
      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.value}>{item.value}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Seed({
  parameters,
  hash,
  signature,
  slug
}: {
  parameters: any,
  hash: string,
  signature: string,
  slug: string
}) {
  const mounted = useMounted()
  const { data: vanilla } = useVanilla()
  const [seed, setSeed] = useState<Seed|null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams && mounted && seed) {
      const autoDownload = async() => {
        const downloadParam = searchParams.get('download')
        const forceExit = downloadParam === 'false'
        const hasDownloaded = await getKey(hash)
        if (forceExit || hasDownloaded) {
          return
        }
        downloadFile(seed?.data, seed?.name, hash)
      }
      autoDownload()
    }
  }, [hash, mounted, searchParams, seed])

  useEffect(() => {
    const initialize = async () => {
      if (vanilla && !seed?.data) {
        const { seed: seedNum, settings, options } = parameters
        const preset = findPreset(settings)
        if (preset != undefined && preset.settings != undefined) {
          settings.preset = preset.settings.preset
        } else {
          settings.preset = "Custom"
        }
        const seedData = await RandomizeRom(seedNum, settings, options, {
          vanillaBytes: vanilla,
        })
        if (seedData.data) {
          setSeed(seedData)
        }
      }
    }
    initialize()
  }, [parameters, vanilla, seed])

  const hasVanilla = Boolean(vanilla)
  const parsedParams = parseSettings(parameters)

  return (
    <div>
      <div className={cn(styles.signature, !vanilla && styles.noVanilla)}>{signature || <>&nbsp;</>}</div>
      <div className={styles.download}>
        {(hasVanilla && seed) ? (
          <Button variant="hero" onClick={(evt) => {
            evt.preventDefault()
            // TODO: Refactor to show loading state if still getting seed
            if (seed) {
              downloadFile(seed?.data, seed?.name, hash)
            }
          }}>
            <ArrowDown size={14} strokeWidth={2} />
            <>&nbsp;</>
            <span className={styles.mono}>{seed?.name}</span>
          </Button>
        ) : (
          <div style={{ maxWidth: '300px' }}>
            <VanillaButton />
          </div>
        )}
      </div>
      <Parameters title="Randomization" items={parsedParams.randomizeParams} />
      <Parameters title="Settings" items={parsedParams.settingsParams} />
      <Parameters title="Options" items={parsedParams.optionsParams} />
      <div className={styles.qr}>
        <button onClick={(evt) => {
          evt.preventDefault()
          window.open(`/seed/${slug}/qr-popup`, '_blank', 'width=300,height=340')
        }}>
          Display QR Code
        </button>
        <ExternalLink size={12} strokeWidth={2} />
      </div>
    </div>
  )
}
