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
                  name="area"
                />
                <p>
                  <Link href="/generate/info#boss">Boss Randomization</Link>{' '}
                  can randomize the boss found at a given boss location.
                </p>
              </Option>
            </Section>
            <Section title="Settings" />
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
