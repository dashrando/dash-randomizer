'use client'

import Link from 'next/link'
import { Heading } from '../components/text'
import Select from '../components/select'
import Numeric from '../components/numeric'
import styles from './page.module.css'
import { cn, downloadFile } from '@/lib/utils'
import VanillaButton, { useVanilla } from './vanilla'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button'
import useMounted from '../hooks/useMounted'
import { Item, RandomizeRom } from 'core'
import {
  BeamMode,
  GravityHeatReduction,
  MajorDistributionMode,
  MapLayout,
  MinorDistributionMode,
  SuitMode
} from 'core/params'
import { useEffect } from 'react'

const Sidebar = () => {
  const { data, isLoading } = useVanilla()
  const mounted = useMounted()
  if (!mounted) return null

  console.debug('sidebar', data, isLoading)
  return (
    <aside className={styles.sidebar}>
      {data ? (
        <Button type="submit">
          Download Seed
        </Button>
      ) : (
        <VanillaButton />
      )}
    </aside>
  )
}

const SectionHeading = ({ title = '' }) => (
  <div className={styles.heading}>
    <Heading>{title}</Heading>
  </div>
)

const Section = ({ children, title }: { children?: React.ReactNode, title: string }) => (
  <section className={cn(styles.section, styles.open)}>
    <SectionHeading title={title} />
    <div>
      {children}
    </div>
  </section>
)

const Option = (
  { children, label, name }:
  { children?: React.ReactNode, label: string, name: string }
) => (
  <div className={styles.option}>
    <label className={styles.label} htmlFor={`select-${name}`}>{label}</label>
    <div className={styles.content}>
      {children}
    </div>
  </div>
)

export type GenerateSeedParams = {
  'item-split': 'recall-mm' | 'standard-mm' | 'full',
  area: 'standard' | 'randomized',
  boss: 'standard' | 'randomized' | 'known',
  minors: 'standard' | 'dash',
  'map-layout': 'standard-vanilla' | 'dash-recall',
  'beam-mode': 'vanilla' | 'classic' | 'recall' | 'new',
  'gravity-heat-reduction': 'off' | 'on',
  'double-jump': 'off' | 'on',
  'heat-shield': 'off' | 'on',
  'pressure-valve': 'none' | 'one' | 'two',
  'seed-mode': 'random' | 'fixed',
  seed: number,
  fanfare: 'off' | 'on', 
}

export interface GenerateFormParams extends GenerateSeedParams {
  mode: 'dash-recall-v2' | 'dash-recall-v1' | 'dash-classic' | 'standard',
}

const MODES = {
  'dash-recall-v2': {
    'item-split': 'recall-mm',
    area: 'standard',
    boss: 'standard',
    minors: 'dash',
    'map-layout': 'dash-recall',
    'beam-mode': 'recall',
    'gravity-heat-reduction': 'on',
    'double-jump': 'on',
    'heat-shield': 'on',
    'pressure-valve': 'one',
    // 'pressure-valve': 'two',
  },
  'dash-recall-v1': {
    'item-split': 'recall-mm',
    area: 'standard',
    boss: 'standard',
    minors: 'dash',
    'map-layout': 'dash-recall',
    'beam-mode': 'recall',
    'gravity-heat-reduction': 'on',
    'double-jump': 'on',
    'heat-shield': 'on',
    'pressure-valve': 'one',
  },
  'dash-classic': {
    'item-split': 'standard-mm',
    area: 'standard',
    boss: 'standard',
    minors: 'dash',
    'map-layout': 'standard-vanilla',
    'beam-mode': 'classic',
    'gravity-heat-reduction': 'on',
    'double-jump': 'off',
    'heat-shield': 'off',
    'pressure-valve': 'none',
  },
  'standard': {
    'item-split': 'standard-mm',
    area: 'standard',
    boss: 'standard',
    minors: 'standard',
    'map-layout': 'standard-vanilla',
    'beam-mode': 'vanilla',
    'gravity-heat-reduction': 'off',
    'double-jump': 'off',
    'heat-shield': 'off',
    'pressure-valve': 'none',
  }
}

export default function Form() {
  const { register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<GenerateFormParams>()
  const { data: vanilla } = useVanilla()
  const onSubmit = async (data: GenerateSeedParams) => {
    try {
      console.log("submit", data);
      const config = { vanillaBytes: vanilla };

      const getSeed = () => {
        if (data['seed-mode'] == 'fixed') {
          return data.seed;
        }

        const [minSeed, maxSeed] = [1, 999999];
        const numSeeds = maxSeed - minSeed + 1;
        const randomArray = new Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        return minSeed + (randomArray[0] % numSeeds);
      }

      let mapLayout = MapLayout.Standard;
      if (data['map-layout'] == 'dash-recall') {
        mapLayout = MapLayout.Recall;
      }

      const minorDistribution = {
        mode: MinorDistributionMode.Standard,
        missiles: 3,
        supers: 2,
        powerbombs: 1
      };
      if (data.minors == "dash") {
        minorDistribution.missiles = 2;
        minorDistribution.supers = 1;
        minorDistribution.powerbombs = 1;
      }

      const majorDistribution = {
        mode: MajorDistributionMode.Standard,
        extraItems: [] as number[],
      };

      if (data['item-split'] == "full") {
        majorDistribution.mode = MajorDistributionMode.Full;
      } else if (data['item-split'] == "recall-mm") {
        majorDistribution.mode = MajorDistributionMode.Recall;
      }
      if (data['double-jump'] == "on") {
        majorDistribution.extraItems.push(Item.DoubleJump);
      }
      if (data['heat-shield'] == "on") {
        majorDistribution.extraItems.push(Item.HeatShield);
      }
      if (data['pressure-valve'] == "one") {
        majorDistribution.extraItems.push(Item.PressureValve);
      }

      const itemPoolParams = {
        majorDistribution: majorDistribution,
        minorDistribution: minorDistribution
      };

      const settings = {
        beamMode: BeamMode.Vanilla,
        suitMode: SuitMode.Dash,
        gravityHeatReduction: GravityHeatReduction.On
      };

      if (data['beam-mode'] == 'classic') {
        settings.beamMode = BeamMode.DashClassic;
      } else if (data['beam-mode'] == 'recall') {
        settings.beamMode = BeamMode.DashRecall;
      } else if (data['beam-mode'] == 'new') {
        settings.beamMode = BeamMode.New;
      }

      if (data['gravity-heat-reduction'] == 'off') {
        settings.gravityHeatReduction = GravityHeatReduction.Off;
      }

      const options = {
        DisableFanfare: 0,
      };
      if (data.fanfare == 'off') {
        options.DisableFanfare = 1;
      };

      const { data: seed, name } = await RandomizeRom(
        getSeed(),
        mapLayout,
        itemPoolParams,
        settings,
        options,
        config
      )
      downloadFile(seed, name)
    } catch (error) {
      console.error('SEED ERROR', error)
    }
  };
  const currentMode = watch('mode');

  useEffect(() => {
    if (currentMode) {
      const mode = MODES[currentMode];
      Object.keys(mode).forEach(k => {
        const key = k as keyof typeof mode;
        const value = mode[key] as any
        setValue(key, value);
      });
    }
  }, [currentMode, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <div className={styles.sections}>
          <Section title="Mode">
            <Option label="Mode" name="mode">
              <Select
                options={[
                  { label: 'DASH: Recall v2', value: 'dash-recall-v2' },
                  { label: 'DASH: Recall v1', value: 'dash-recall-v1' },
                  { label: 'DASH: Classic', value: 'dash-classic' },
                  { label: 'Standard', value: 'standard' },
                ]}
                name="mode"
                register={register}
              />
            </Option>
          </Section>
          <Section title="Randomization">
            <Option label="Item Split" name="item-split">
              <Select
                options={[
                  { label: 'Recall Major/Minor', value: 'recall-mm' },
                  { label: 'Standard Major/Minor', value: 'standard-mm' },
                  { label: 'Full', value: 'full' },
                ]}
                name="item-split"
                register={register}
              />
              <p>
                <Link href="/generate/info#item-split">Item Split</Link>{' '}
                determines the available locations where major items can be placed.
              </p>
            </Option>
            <Option label="Area" name="area">
              <Select
                options={[
                  { label: 'Standard', value: 'standard' },
                  { label: 'Randomized', value: 'randomized' },
                ]}
                name="area"
                register={register}
              />
              <p>
                <Link href="/generate/info#area">Area Randomization</Link>{' '}
                will randomize the portals between certain areas or leave them as in the vanilla game.
              </p>
            </Option>
            <Option label="Boss" name="boss">
              <Select
                options={[
                  { label: 'Standard', value: 'standard' },
                  { label: 'Randomized', value: 'randomized' },
                  { label: 'Known', value: 'known' },
                ]}
                name="boss"
                register={register}
              />
              <p>
                <Link href="/generate/info#boss">Boss Randomization</Link>{' '}
                can randomize the boss found at a given boss location.
              </p>
            </Option>
          </Section>
          <Section title="Settings">
            <Option label="Minor Item Distribution" name="minors">
              <Select
                options={[
                  { label: 'Standard - 3:2:1', value: 'standard' },
                  { label: 'DASH - 2:1:1', value: 'dash' },
                ]}
                name="minors"
                register={register}
              />
              <p>
                <Link href="/generate/info#minors">Minor Item Distribution</Link>{' '}
                determines the ratio of minor items placed throughout the game.
              </p>
            </Option>
            <Option label="Map Layout" name="map-layout">
              <Select
                options={[
                  { label: 'Standard Vanilla', value: 'standard-vanilla' },
                  { label: 'DASH Recall', value: 'dash-recall' },
                ]}
                name="map-layout"
                register={register}
              />
              <p>
                <Link href="/generate/info#map-layout">Map Layout</Link>{' '}
                applies various tweaks, anti-soft lock patches and other quality of life improvements.
              </p>
            </Option>
            <Option label="Beam Mode" name="beam-mode">
              <Select
                options={[
                  { label: 'Vanilla', value: 'vanilla' },
                  { label: 'Classic', value: 'classic' },
                  { label: 'Recall', value: 'recall' },
                  { label: 'New', value: 'new' },
                ]}
                name="beam-mode"
                register={register}
              />
              <p>
                <Link href="/generate/info#beam-mode">Beam Mode</Link>{' '}
                alters the amount of damage caused by Charge Beam.
              </p>
            </Option>
            <Option label="Gravity Heat Reduction" name="gravity-heat-reduction">
              <Select
                options={[
                  { label: 'On', value: 'on' },
                  { label: 'Off', value: 'off' },
                ]}
                name="gravity-heat-reduction"
                register={register}
              />
              <p>
                <Link href="/generate/info#gravity-heat-reduction">Gravity Heat Reduction</Link>{' '}
                causes Gravity Suit to provide 25% heat damage reduction.
              </p>
            </Option>
            <Option label="Double Jump" name="double-jump">
              <Select
                options={[
                  { label: 'On', value: 'on' },
                  { label: 'Off', value: 'off' },
                ]}
                name="double-jump"
                register={register}
              />
              <p>
                <Link href="/generate/info#double-jump">Double Jump</Link>{' '}
                is a new item that works as a single-use Space Jump.
              </p>
            </Option>
            <Option label="Heat Shield" name="heat-shield">
              <Select
                options={[
                  { label: 'On', value: 'on' },
                  { label: 'Off', value: 'off' },
                ]}
                name="heat-shield"
                register={register}
              />
              <p>
                <Link href="/generate/info#heat-shield">Heat Shield</Link>{' '}
                is a new item that works as a mini-Varia.
              </p>
            </Option>
            <Option label="Pressure Valve" name="pressure-valve">
              <Select
                options={[
                  { label: 'None', value: 'none' },
                  { label: '1', value: 'one' },
                  //{ label: '2', value: 'two' },
                ]}
                name="pressure-valve"
                register={register}
              />
              <p>
                <Link href="/generate/info#pressure-valve">Pressure Valve</Link>{' '}
                is a new item that works as a mini-Gravity.
              </p>
            </Option>
          </Section>
          <Section title="Options">
            <Option label="Seed Mode" name="seed-mode">
              <Select
                options={[
                  { label: 'Random', value: 'random' },
                  { label: 'Fixed', value: 'fixed' },
                ]}
                name="seed-mode"
                register={register}
              />
              <p>
                <Link href="/generate/info#seed-mode">Seed Mode</Link>{' '}
                controls how the random number generator is initialized.
              </p>
            </Option>
            <Option label="Seed" name="seed">
              <Numeric minVal={1} maxVal={999999} name="seed" register={register} />
              <p>
                <Link href="/generate/info#seed">Seed</Link>{' '}
                refers to the random number seed.
              </p>
            </Option>
            <Option label="Item Fanfare" name="fanfare">
              <Select
                options={[
                  { label: 'On', value: 'on' },
                  { label: 'Off', value: 'off' },
                ]}
                name="fanfare"
                register={register}
              />
              <p>
                <Link href="/generate/info#fanfare">Item Fanfare</Link>{' '}
                is the music when an item is collected.
              </p>
            </Option>
          </Section>
        </div>
        <Sidebar />
      </div>
    </form>
  )
}