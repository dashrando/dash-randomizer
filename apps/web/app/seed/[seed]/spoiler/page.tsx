import styles from '../../../seed/[seed]/seed.module.css'
import { prefetchSignature } from 'core'
import { notFound } from 'next/navigation'
import DownloadButton from './download-button'
import Link from 'next/link'
import { hashToParams } from '@/lib/settings'
import { getSeedData } from '@/lib/seed-data'
import { getSpoiler } from '@/lib/spoiler'

export default async function RaceSeedSpoilerPage({ params }: { params: { seed: string } }) {
  const { seed } = params
  const data = await getSeedData(seed)
  if (!data) {
    return <div>Seed not found: {seed}</div>
  }

  const { hash, spoiler } = data
  if (!spoiler) {
    return notFound()
  }

  const spoilerData = getSpoiler(hash)
  const seedParams = hashToParams(hash)
  const seedNum = seedParams.seed
  const sig = prefetchSignature(seedNum)
  const bosses = spoilerData['Bosses']
  const areas = spoilerData['Area Transitions']
  const items = spoilerData['Items']

  return (
    <main className={styles.container}>
      <h1 className={styles.logo}>DASH</h1>
      <div className={styles.signature}>{sig || <>&nbsp;</>}</div>
      <div style={{ marginTop: '32px' }} />
      <DownloadButton raceKey={seed} data={spoilerData} />
      <div className={styles.spoiler_data}>
        <section className={styles.spoiler_section}>
          <h3>Bosses</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.label}>Location</th>
                <th className={styles.label}>Boss</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(bosses).map((location) => {
                return (
                  <tr key={location}>
                    <td>{location}</td>
                    <td>{bosses[location]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className={styles.spoiler_section}>
          <h3>Transitions</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.label}>From</th>
                <th className={styles.label}>To</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(areas).map((transition) => {
                const fromValue = transition.replace('Door_', '')
                const toValue = areas[transition].replace('Door_', '')
                return (
                  <tr key={transition}>
                    <td>{fromValue}</td>
                    <td>{toValue}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className={styles.spoiler_section}>
          {Object.keys(items).map((area) => (
            <div key={area} className={styles.area}>
              <h3>Items &mdash; {area}</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.label}>Location</th>
                    <th className={styles.label}>Item</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(items[area]).map((item) => {
                    return (
                      <tr key={item}>
                        <td>{item}</td>
                        <td>{items[area][item]}</td>
                      </tr>
                    )})}
                  </tbody>
              </table>
            </div>
          ))}
        </section>
      </div>
      <footer className={styles.footer}>
        <p>
          <Link href={`/seed/${seed}`}>Return to Seed Page</Link>
        </p>
      </footer>
    </main>
  )
}
