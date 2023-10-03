'use client'

import { useEffect, useState } from 'react'
import useMounted from '@/app/hooks/useMounted'
import { useVanilla } from '@/app/generate/vanilla'
import styles from './seed.module.css'
import { RandomizeRom, findPreset, Item } from 'core'
import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  GravityHeatReduction
} from 'core/params'
import { cn } from '@/lib/utils'
import { downloadFile } from '@/lib/downloads'
import Button from '@/app/components/button'
import { useSearchParams } from 'next/navigation'
import { get as getKey } from 'idb-keyval'
import { ArrowDown } from 'react-feather'
import VanillaButton from '@/app/generate/vanilla'


type Seed = {
  data: any
  name: string
}

const getItemSplit = (value: number) => {
  switch (value) {
    case MajorDistributionMode.Standard:
    case MajorDistributionMode.Recall:
      return 'Major/Minor'
    default:
      return 'Full'
  }
}

const getMinorItemDistribution = (value: number) => {
  switch (value) {
    case MinorDistributionMode.Dash:
      return 'DASH - 2:1:1'
    case MinorDistributionMode.Standard:
      return 'Standard - 3:2:1'
  }
}

const getEnvironmentUpdates = (value: number) => {
  switch (value) {
    case MapLayout.Standard:
      return "Standard"
    case MapLayout.Recall:
      return "DASH: Recall"
    case MapLayout.Classic:
      return "DASH"
  }
}

const getBossMode = (value: number) => {
  return (value === 2) ? 'Shifted' : 'Vanilla'
}

const getAreaMode = (environment: number, area: boolean) => {
  if (area) {
    return 'Area Randomization';
  }
  if (environment == MapLayout.Recall) {
    return 'DASH: Recall';
  }
  return 'Vanilla';
}

const getBeamMode = (value: number) => {
  switch (value) {
    case BeamMode.Vanilla:
      return 'Vanilla'
    case BeamMode.DashClassic:
      return 'Starter'
    case BeamMode.DashRecall:
      return 'Recall'
    case BeamMode.New:
      return 'Starter+'
  }
}

const getGravityMode = (value: number) => {
  return value === GravityHeatReduction.On ? 'On' : 'Off'
}

const displayOnOff = (value: boolean) => value ? 'On' : 'Off'

const getExtraItems = (extraItems: number[]) => {
  const doubleJump = displayOnOff(extraItems.includes(Item.DoubleJump))
  const heatShield = displayOnOff(extraItems.includes(Item.HeatShield))
  const pressureValve = displayOnOff(extraItems.includes(Item.PressureValve))
  return { doubleJump, heatShield, pressureValve }
}

const parseSettings = (parameters: any) => {
  const { settings } = parameters
  const extraItems = getExtraItems(settings.extraItems)
  const randomizeParams = [
    { label: 'Item Split', value: getItemSplit(settings.majorDistribution) },
    { label: 'Boss Locations', value: getBossMode(settings.bossMode) },
    { label: 'Map Layout', value: getAreaMode(settings.mapLayout, settings.randomizeAreas) }
  ]
  const settingsParams = [
    { label: 'Minor Item Distribution', value: getMinorItemDistribution(settings.minorDistribution)},
    { label: 'Environment Updates', value: getEnvironmentUpdates(settings.mapLayout) },
    { label: 'Charge Beam', value: getBeamMode(settings.beamMode), },
    { label: 'Gravity Heat Reduction', value: getGravityMode(settings.gravityHeatReduction), },
    { label: 'Double Jump', value: extraItems.doubleJump, },
    { label: 'Heat Shield', value: extraItems.heatShield, },
    { label: 'Pressure Valve', value: extraItems.pressureValve, },
  ]
  const optionsParams = [
    { label: 'Seed Number', value: parameters.seed },
    { label: 'Disable Fanfare', value: displayOnOff(parameters.options.DisableFanfare), }
  ]
  return { randomizeParams, settingsParams, optionsParams }
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
  signature
}: {
  parameters: any,
  hash: string,
  signature: string
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
    </div>
  )
}
