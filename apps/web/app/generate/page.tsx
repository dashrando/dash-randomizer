import type { Metadata, NextPage } from 'next'
import Link from 'next/link'
import { Heading } from '../components/text'
import Select from '../components/select'
import styles from './page.module.css'

const SectionHeading = ({ title = '' }) => (
  <div className={styles.heading}>
    <Heading>{title}</Heading>
  </div>
)

const Section = ({ children, title }: { children?: React.ReactNode, title: string }) => (
  <section className={styles.section}>
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

const GeneratePage: NextPage = () => {
  return (
    <div>
      <main className={styles.container}>
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
                />
              </Option>
            </Section>
            <Section title="Randomization">
              <Option label="Item Split" name="item-split">
                <Select
                  options={[
                    { label: 'DASH: Recall v2', value: 'dash-recall-v2' },
                    { label: 'DASH: Recall v1', value: 'dash-recall-v1' },
                    { label: 'DASH: Classic', value: 'dash-classic' },
                    { label: 'Standard', value: 'standard' },
                  ]}
                  name="item-split"
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
                    { label: 'Standard', value: 'standard' },
                    { label: 'DASH', value: 'dash' },
                  ]}
                  name="minors"
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
                    { label: 'DASH Classic', value: 'dash-classic' },
                    { label: 'DASH Recall', value: 'dash-recall' },
                  ]}
                  name="map-layout"
                />
                <p>
                  <Link href="/generate/info#map-layout">Map Layout</Link>{' '}
                  applies various tweaks, anti-soft lock patches and other quality of life improvements.
                </p>
              </Option>
              <Option label="Suit Properties" name="suit-properties">
                <Select
                  options={[
                    { label: 'DASH', value: 'dash' },
                    { label: 'Varia', value: 'varia' },
                  ]}
                  name="suit-properties"
                />
                <p>
                  <Link href="/generate/info#suit-properties">Suit Properties</Link>{' '}
                  alters the defensive properties of both Gravity and Varia suit.
                </p>
              </Option>
              <Option label="Double Jump" name="double-jump">
                <Select
                  options={[
                    { label: 'On', value: 'on' },
                    { label: 'Off', value: 'off' },
                  ]}
                  name="double-jump"
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
                    { label: 'On', value: 'on' },
                    { label: 'Movement', value: 'movement' },
                  ]}
                  name="pressure-valve"
                />
                <p>
                  <Link href="/generate/info#pressure-valve">Pressure Valve</Link>{' '}
                  is a new item that works as a mini-Gravity.
                </p>
              </Option>
            </Section>
            <Section title="Options" />
          </div>
          <aside></aside>
        </div>
      </main>
    </div>
  )
}

export default GeneratePage

export const metadata: Metadata = {
  title: 'DASH Randomizer - Generate',
  description: 'Generate DASH randomized seed',
}
