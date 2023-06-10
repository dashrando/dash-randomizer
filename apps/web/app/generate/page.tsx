import type { Metadata, NextPage } from 'next'
import { Heading } from '../components/text'
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

const GeneratePage: NextPage = () => {
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.sections}>
            <Section title="Mode" />
            <Section title="Randomization" />
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
