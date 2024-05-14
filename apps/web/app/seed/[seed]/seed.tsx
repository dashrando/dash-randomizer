'use client'

import { useEffect, useState } from 'react'
import useMounted from '@/app/hooks/useMounted'
import { useVanilla } from '@/app/generate/vanilla'
import styles from './seed.module.css'
import { RandomizeRom, ProtectRom, findPreset } from 'core'
import { cn } from '@/lib/utils'
import { downloadFile } from '@/lib/downloads'
import Button, { ButtonLink } from '@/app/components/button'
import { useSearchParams } from 'next/navigation'
import { get as getKey } from 'idb-keyval'
import { ArrowDown, ExternalLink } from 'react-feather'
import VanillaButton from '@/app/generate/vanilla'
import { parseSettings } from '@/lib/settings'
import Link from 'next/link'

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

const getSeedName = (seed: Seed|null, raceKey: string, mystery: boolean) => {
  if (!seed) {
    return ''
  }
  const extension = seed.name.split('.').pop()
  const parts = seed.name.split('_')
  if (mystery) {
    parts[1] = 'Mystery'
  }
  if (raceKey) {
    parts[2] = raceKey
  }

  return `${parts.join('_')}.${extension}`
}

export default function Seed({
  parameters,
  hash,
  mystery = false,
  race = false,
  signature,
  slug,
  spoiler = false,
}: {
  parameters: any,
  mystery?: boolean,
  hash: string,
  race?: boolean,
  signature: string,
  slug: string,
  spoiler?: boolean
}) {
  const mounted = useMounted()
  const { data: vanilla } = useVanilla()
  const [seed, setSeed] = useState<Seed|null>(null)
  const searchParams = useSearchParams()
  const create = race ? ProtectRom : RandomizeRom

  useEffect(() => {
    if (searchParams && mounted && seed) {
      const autoDownload = async() => {
        const downloadParam = searchParams.get('download')
        const forceExit = downloadParam === 'false'
        const hasDownloaded = await getKey(hash)
        const name = getSeedName(seed, slug, mystery)
        if (forceExit || hasDownloaded) {
          return
        }
        downloadFile(seed?.data, name, hash)
      }
      autoDownload()
    }
  }, [hash, mounted, mystery, searchParams, seed, slug])

  useEffect(() => {
    const initialize = async () => {
      if (vanilla && !seed?.data) {
        const { seed: seedNum, settings, options } = parameters
        const preset = findPreset(settings, options)
        const seedData = await create(seedNum, settings, options, {
          vanillaBytes: vanilla,
          presetName: preset == undefined ? "Custom" : preset.fileName
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
  const seedName = getSeedName(seed, slug, mystery)

  return (
    <div>
      <div className={cn(styles.signature, !vanilla && styles.noVanilla)}>{signature || <>&nbsp;</>}</div>
      <div className={styles.download}>
        {(hasVanilla && seed) ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="hero" onClick={(evt) => {
              evt.preventDefault()
              // TODO: Refactor to show loading state if still getting seed
              if (seed) {
                downloadFile(seed?.data, seedName, hash)
              }
            }}>
              <ArrowDown size={14} strokeWidth={2} />
              <>&nbsp;</>
              <span className={styles.mono}>{seedName}</span>
            </Button>
            {spoiler && (
              <div className={styles.spoiler_link}>
                <Link href={`/seed/race/${slug}/spoiler`}>
                  View Spoiler Log
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '300px' }}>
            <VanillaButton />
          </div>
        )}
      </div>
      {!mystery ? (
        <>
          <Parameters title="Randomization" items={parsedParams.randomizeParams} />
          <Parameters title="Settings" items={parsedParams.settingsParams} />
          <Parameters title="Options" items={parsedParams.optionsParams} />
          {!race && (
            <div className={styles.qr}>
              <button onClick={(evt) => {
                evt.preventDefault()
                window.open(`/seed/${slug}/qr-popup`, '_blank', 'width=300,height=340')
              }}>
                Display QR Code
              </button>
              <ExternalLink size={12} strokeWidth={2} />
            </div>
          )}
        </>
      ) : (
        <div>This is a mystery seed</div>
      )}
    </div>
  )
}
