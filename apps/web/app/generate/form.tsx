'use client'

import { Heading } from '../components/text'
import Select from '../components/select'
import Numeric from '../components/numeric'
import styles from './page.module.css'
import { downloadFile } from '@/lib/downloads'
import { cn, deepEqual  } from '@/lib/utils'
import VanillaButton, { useVanilla } from './vanilla'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button'
import Badge from '../components/badge'
import useMounted from '../hooks/useMounted'
import { Item, RandomizeRom, paramsToString } from 'core'
import {
  BeamMode,
  BossMode,
  GravityHeatReduction,
  MajorDistributionMode,
  MapLayout,
  MinorDistributionMode,
  SuitMode
} from 'core/params'
import { fetchSignature } from 'core'
import { useCallback, useEffect, useState } from 'react'
import Spacer from '../components/spacer'

const Sidebar = ({
  name = null,
  signature = null,
  hash = null
}: {
  name?: string | null
  signature?: string | null
  hash?: string | null
}) => {
  const { data } = useVanilla()
  const mounted = useMounted()
  const [open, setOpen] = useState<Boolean>(false)
  
  useEffect(() => {
    if (signature) {
      setOpen(true)
    }
  }, [signature])

  return (
    <aside className={cn(styles.sidebar, { [styles.sidebarMobileLoaded]: data, [styles.open]: open })}>
      {mounted ? (
        (data) ? (
          <div>
            <div className={styles.sidebarButtons}>
              {/* Generate a seed */}
              <Button type="submit" block variant="primary">
                Generate Seed
              </Button>
              {/* Has a seed */}
              {(signature && name) && (
                <Button
                  className={styles['mobile-sidebar-btn']}
                  variant="plain"
                  onClick={(evt) => {
                  evt.preventDefault()
                  setOpen(!open)
                }}>
                  {open ? 'Close' : 'Open'}
                </Button>
              )}
            </div>
            {signature && name && (
              <div className={styles.sidebarContent}>
                <div style={{ margin: '2em 0' }}>
                  <h4 className={styles.sidebarHeading}>
                    Signature
                  </h4>
                  <code className={styles.mono}>{signature}</code>
                </div>
                <div style={{ margin: '2em 0' }}>
                  <h4 className={styles.sidebarHeading}>
                    Filename
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#fff' }}>{name}</p>
                </div>
                <div style={{ margin: '2em 0' }}>
                  <h4 className={styles.sidebarHeading}>
                    Seed URL
                  </h4>
                  <p style={{ fontSize: '14px', margin: 0, wordWrap: 'break-word' }}>
                    <a href={`/seed/${hash}`} style={{ color: 'white', fontWeight: 700 }}>
                      {`${hash}`}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // no vanilla, no seed
          <VanillaButton />
        )) : null}
    </aside>
  )
}

const SectionHeading = ({ title = '' }) => (
  <div className={styles.heading}>
    <Heading>{title}</Heading>
  </div>
)

const Section = ({ children, title, className = null, noHeading = false }: { children?: React.ReactNode, title: string, className?: string | null, noHeading?: boolean }) => (
  <section className={cn(styles.section, styles.open, className)}>
    {!noHeading && <SectionHeading title={title} />}
    <div className={styles.section_content}>
      {children}
    </div>
  </section>
)

const Option = (
  { children, label, name, badge = null, noLabel = false }:
  { children?: React.ReactNode, label: string, name?: string, badge?: React.ReactNode, noLabel?: boolean }
) => {
  const labelAttr: any = {
    className: styles.label,
  }
  if (name) {
    labelAttr.htmlFor = `select-${name}`
  }
  return (
    <div className={styles.option}>
      <div className={styles.info}>
        {noLabel ?
          (
            <div {...labelAttr}>{label}</div>
          ) : (
            <label {...labelAttr}>{label}</label>
          )}
        <Spacer y={2} />
        {badge}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export interface GenerateSeedSettings {
  'item-split': 'standard-mm' | 'full',
  'map-layout': 'standard' | 'randomized' | 'recall',
  boss: 'standard' | 'randomized' | 'known',
  minors: 'standard' | 'dash',
  'environment': 'standard' | 'dash-recall' | 'dash-classic',
  'charge-beam': 'vanilla' | 'starter' | 'starter-plus',
  'gravity-heat-reduction': 'off' | 'on',
  'double-jump': 'off' | 'on',
  'heat-shield': 'off' | 'on',
  'pressure-valve': 'none' | 'one' | 'two',
}

export interface GenerateSeedParams extends GenerateSeedSettings {
  'seed-mode': 'random' | 'fixed',
  seed: number,
  fanfare: 'off' | 'on', 
}

export interface GenerateFormParams extends GenerateSeedParams {
  mode: 'sgl23' | 'dash-recall' | 'dash-classic' | '2017' | 'custom' | null,
}

const MODES = {
  'sgl23': {
    'item-split': 'full',
    'map-layout': 'randomized',
    boss: 'randomized',
    minors: 'standard',
    'environment': 'standard',
    'charge-beam': 'vanilla',
    'gravity-heat-reduction': 'off',
    'double-jump': 'on',
    'heat-shield': 'off',
    'pressure-valve': 'none',
  },
  'dash-recall': {
    'item-split': 'standard-mm',
    'map-layout': 'recall',
    boss: 'standard',
    minors: 'dash',
    'environment': 'dash-recall',
    'charge-beam': 'starter-plus',
    'gravity-heat-reduction': 'on',
    'double-jump': 'on',
    'heat-shield': 'on',
    'pressure-valve': 'one',
  },
  'dash-classic': {
    'item-split': 'standard-mm',
    'map-layout': 'standard',
    boss: 'standard',
    minors: 'dash',
    'environment': 'dash-classic',
    'charge-beam': 'starter',
    'gravity-heat-reduction': 'on',
    'double-jump': 'off',
    'heat-shield': 'off',
    'pressure-valve': 'none',
  },
  '2017': {
    'item-split': 'standard-mm',
    'map-layout': 'standard',
    boss: 'standard',
    minors: 'standard',
    'environment': 'standard',
    'charge-beam': 'vanilla',
    'gravity-heat-reduction': 'off',
    'double-jump': 'off',
    'heat-shield': 'off',
    'pressure-valve': 'none',
  }
}

const getModeFields = (input: GenerateFormParams): GenerateSeedSettings => {
  const values = { ...input } as any
  delete values.mode
  delete values.seed
  delete values['seed-mode']
  delete values.fanfare
  return values
}

const findMode = (params: GenerateSeedSettings): keyof typeof MODES | null => {
  const modes = Object.keys(MODES) as (keyof typeof MODES)[]
  const mode = modes.find(m => {
    const mode = MODES[m]
    const isEqual = deepEqual(params, mode)
    return isEqual
  })
  return mode || null
}

const prefillSettingsFromPreset = (value: GenerateFormParams, reset: any) => {
  try {
    const preset = value['mode']
    if (preset && preset !== 'custom') {
      const mode = MODES[preset];
      const settings = { ...value, ...mode }
      reset(settings);
    }
  } catch (error) {
    console.error('Error with setting values for mode', error)
  }
}

type RolledSeed = {
  seed: any
  name: string
  hash: string
}

export default function Form() {
  const {
    getValues,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<GenerateFormParams>({
    defaultValues: {
      'mode': undefined,
      'seed-mode': 'random',
    }
  })
  const [rolledSeed, setRolledSeed] = useState<RolledSeed | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const { data: vanilla, isLoading: vanillaLoading } = useVanilla()
  const mounted = useMounted()
  const layout = watch('map-layout');

  const updateMode = useCallback((value: unknown) => {
    const data = value as GenerateFormParams
    const input = getModeFields(data)
    const matchedMode = findMode(input)
    if (matchedMode) {
      setValue('mode', matchedMode)
    } else {
      setValue('mode', 'custom')
    }
    console.log('updating mode', value, matchedMode || 'custom')
  }, [setValue])

  const onSubmit = async (data: GenerateFormParams) => {
    try {
      const config = { vanillaBytes: vanilla };

      const getSeed = () => {
        if (data['seed-mode'] === 'fixed') {
          return data.seed;
        }

        const [minSeed, maxSeed] = [1, 999999];
        const numSeeds = maxSeed - minSeed + 1;
        const randomArray = new Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        return minSeed + (randomArray[0] % numSeeds);
      }

      let mapLayout = MapLayout.Standard;
      if (data['environment'] == 'dash-recall') {
        mapLayout = MapLayout.Recall;
      }
      if (data['environment'] == 'dash-classic') {
        mapLayout = MapLayout.Classic;
      }

      const minorDistribution =
        data.minors == "dash" ?
        MinorDistributionMode.Dash :
        MinorDistributionMode.Standard

      let majorDistribution = MajorDistributionMode.Standard;
      if (data['map-layout'] == 'recall') {
        majorDistribution = MajorDistributionMode.Recall;
      }
      if (data['item-split'] == "full") {
        majorDistribution = MajorDistributionMode.Full;
      }

      const extraItems = [];
      if (data['double-jump'] == "on") {
        extraItems.push(Item.DoubleJump);
      }
      if (data['heat-shield'] == "on") {
        extraItems.push(Item.HeatShield);
      }
      if (data['pressure-valve'] == "one") {
        extraItems.push(Item.PressureValve);
      }

      const settings = {
        preset: "Custom",
        mapLayout: mapLayout,
        majorDistribution: majorDistribution,
        minorDistribution: minorDistribution,
        extraItems: extraItems,
        beamMode: BeamMode.Vanilla,
        suitMode: SuitMode.Dash,
        gravityHeatReduction: GravityHeatReduction.On,
        randomizeAreas: false,
        bossMode: BossMode.Vanilla,
      };

      if (data.mode == 'dash-recall') {
        settings.preset = "RecallMM";
      } else if (data.mode == 'dash-classic') {
        settings.preset = "ClassicMM";
      } else if (data.mode == '2017') {
        settings.preset = "2017MM";
      } else if (data.mode == 'sgl23') {
        settings.preset = "SGL23"
      }

      if (data['charge-beam'] == 'starter') {
        settings.beamMode = BeamMode.DashClassic;
      } else if (data['charge-beam'] == 'starter-plus') {
        settings.beamMode = BeamMode.New;
      }

      if (data['gravity-heat-reduction'] == 'off') {
        settings.gravityHeatReduction = GravityHeatReduction.Off;
      }

      if (data['map-layout'] == 'randomized') {
        settings.randomizeAreas = true;
      }

      if (data.boss == 'randomized') {
        settings.bossMode = BossMode.ShuffleDash;
      }

      const options = {
        DisableFanfare: 0,
      };
      if (data.fanfare == 'off') {
        options.DisableFanfare = 1;
      };

      const seedNumber = getSeed();
      const { data: seed, name } = await RandomizeRom(
        seedNumber, settings, options, config);
      const hash = paramsToString(seedNumber, settings, options);
      if (seed !== null) {
        downloadFile(seed, name, hash)
      }
      setRolledSeed({ seed, name, hash })
    } catch (error) {
      console.error('SEED ERROR', error)
    }
  };
  const seedMode = watch('seed-mode')

  useEffect(() => {
    const subscription = watch((value: any, { name, type }) => {
      // Listen for change events only
      if (type !== 'change') {
        return
      }

      if (name === 'seed-mode') {
        return
      }

      if (name === 'mode') {
        prefillSettingsFromPreset(value, reset)
        return
      }

      if (name === 'map-layout') {
        if (value['environment'] === 'dash-recall' && value['map-layout'] !== 'recall') {
          setValue('environment', 'standard');
          value['environment'] = 'standard';
        }
        if (value['environment'] !== 'dash-recall' && value['map-layout'] === 'recall') {
          setValue('environment', 'dash-recall');
          value['environment'] = 'dash-recall';
        }
      }

      // Update mode if necessary
      updateMode(value)
    })
    return () => subscription.unsubscribe()
  }, [reset, updateMode, watch])

  useEffect(() => {
    async function calculateSignature(data: any) {
      const sig = await fetchSignature(data)
      setSignature(sig)
    }
    if (rolledSeed) {
      calculateSignature(rolledSeed?.seed)
    }
  }, [rolledSeed])

  useEffect(() => {
    // Once mounted, update the mode if necessary
    // - this is for back button consistency
    if (mounted) {
      const values = getValues()
      updateMode(values)
    }
  }, [mounted, getValues, updateMode])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <div className={styles.sections}>
          <Section title="Mode" noHeading>
            <Option label="Mode" name="mode">
              <Select
                options={[
                  { label: '', value: '', hidden: true },
                  { label: 'SG Live 2023', value: 'sgl23' },
                  { label: 'DASH: Recall', value: 'dash-recall' },
                  { label: 'DASH: Classic', value: 'dash-classic' },
                  { label: 'Throwback 2017', value: '2017' },
                  { label: 'Custom', value: 'custom', hidden: true }
                ]}
                name="mode"
                register={register}
              />
            </Option>
          </Section>
          <Section title="Vanilla" className={styles.mobileVanilla}>
            <Option label="Vanilla" noLabel>
              {mounted ? (
                (!vanillaLoading && vanilla) ? (
                  <Button id="select-vanilla" variant="secondary" disabled block>Vanilla ROM loaded</Button>
                ) : vanillaLoading ? (
                  <Button id="select-vanilla" variant="secondary" disabled block>Loading...</Button>
                ) : (
                  <VanillaButton />
                )
              ) : (
                <Button id="select-vanilla" variant="secondary" disabled block>Loading...</Button>
              )}
            </Option>
          </Section>
          <Section title="Randomization">
            <Option label="Item Split" name="item-split">
              <Select
                options={[
                  { label: 'Full', value: 'full' },
                  { label: 'Major/Minor', value: 'standard-mm' },
                ]}
                name="item-split"
                register={register}
              />
              <p>
                <a href="/info/settings#item-split">Item Split</a>{' '}
                determines the available locations where major items can be placed.
              </p>
            </Option>
            <Option label="Boss Locations" name="boss" badge={<Badge variant="beta">Beta</Badge>}>
              <Select
                options={[
                  { label: 'Shifted', value: 'randomized' },
                  { label: 'Vanilla', value: 'standard' },
                  //{ label: 'Known', value: 'known' },
                ]}
                name="boss"
                register={register}
              />
              <p>
                <a href="/info/settings#boss-locations">Boss Locations</a>{' '}
                determines if major bosses will be in their vanilla location or potentially moved.
              </p>
            </Option>
            <Option label="Map Layout" name="map-layout" badge={<Badge variant="beta">Beta</Badge>}>
              <Select
                options={[
                  { label: 'Area Randomization', value: 'randomized' },
                  { label: 'DASH: Recall', value: 'recall' },
                  { label: 'Vanilla', value: 'standard' },
                ]}
                name="map-layout"
                register={register}
              />
              <p>
                <a href="/info/settings#map-layout">Map Layout</a>{' '}
                determines how the doors around the map are connected.
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
                <a href="/info/settings#minors">Minor Item Distribution</a>{' '}
                determines the ratio of minor items placed throughout the game.
              </p>
            </Option>
            <Option label="Environment Updates" name="environment">
              <Select
                options={layout == 'recall' ?
                  [{ label: 'DASH: Recall', value: 'dash-recall' }] :
                  [
                    { label: 'Standard', value: 'standard' },
                    { label: 'DASH', value: 'dash-classic' },
                  ]}
                disabled={layout == 'recall'}
                name="environment"
                register={register}
              />
              <p>
                <a href="/info/settings#environment">Environment Updates</a>{' '}
                applies various tweaks, anti-soft lock patches and other quality of life improvements.
              </p>
            </Option>
            <Option label="Charge Beam" name="charge-beam">
              <Select
                options={[
                  { label: 'Vanilla', value: 'vanilla' },
                  { label: 'Starter', value: 'starter' },
                  { label: 'Starter+', value: 'starter-plus' },
                ]}
                name="charge-beam"
                register={register}
              />
              <p>
                The <a href="/info/settings#charge-beam">Charge Beam</a>{' '}
                setting alters the amount of damage caused by Charge Beam.
              </p>
            </Option>
            <Option label="Gravity Heat Reduction" name="gravity-heat-reduction">
              <Select
                options={[
                  { label: 'Off', value: 'off' },
                  { label: 'On', value: 'on' },
                ]}
                name="gravity-heat-reduction"
                register={register}
              />
              <p>
                <a href="/info/settings#gravity-heat-reduction">Gravity Heat Reduction</a>{' '}
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
                <a href="/info/settings#double-jump">Double Jump</a>{' '}
                is a new item that works as a single-use Space Jump.
              </p>
            </Option>
            <Option label="Heat Shield" name="heat-shield">
              <Select
                options={[
                  { label: 'Off', value: 'off' },
                  { label: 'On', value: 'on' },
                ]}
                name="heat-shield"
                register={register}
              />
              <p>
                <a href="/info/settings#heat-shield">Heat Shield</a>{' '}
                is a new item that works as a mini-Varia.
              </p>
            </Option>
            <Option label="Pressure Valve" name="pressure-valve">
              <Select
                options={[
                  { label: 'Off', value: 'none' },
                  { label: 'On', value: 'one' },
                  //{ label: '2', value: 'two' },
                ]}
                name="pressure-valve"
                register={register}
              />
              <p>
                <a href="/info/settings#pressure-valve">Pressure Valve</a>{' '}
                is a new item that works as a mini-Gravity.
              </p>
            </Option>
          </Section>
          <Section title="Options">
            {/*<Option label="Seed Mode" name="seed-mode">
              <Select
                options={[
                  { label: 'Random', value: 'random' },
                  { label: 'Fixed', value: 'fixed' },
                ]}
                name="seed-mode"
                register={register}
              />
              {seedMode === 'fixed' && (
                <Numeric minVal={1} maxVal={999999} defaultValue={1} name="seed" register={register} />
              )}
              <p>
                <a href="/info/settings#seed-mode">Seed Mode</a>{' '}
                controls how the random number generator is initialized.
              </p>
              </Option>*/}
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
                <a href="/info/settings#fanfare">Item Fanfare</a>{' '}
                is the music when an item is collected.
              </p>
            </Option>
          </Section>
        </div>
        <Sidebar
          name={rolledSeed?.name || null}
          signature={signature}
          hash={rolledSeed?.hash}
        />
      </div>
    </form>
  )
}