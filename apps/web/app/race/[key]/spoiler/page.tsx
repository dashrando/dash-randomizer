import { getRaceSeedData } from '../race'
import styles from '../../../seed/[seed]/seed.module.css'
import { prefetchSignature } from 'core'
import { notFound } from 'next/navigation'
import DownloadButton from './download-button'
import Link from 'next/link'
import { hashToParams } from '@/lib/settings'


export default async function RaceSeedSpoilerPage({ params }: { params: { key: string } }) {
  const { key } = params
  const data = await getRaceSeedData(key)
  if (!data) {
    return <div>Seed not found</div>
  }

  const { hash, spoiler } = data
  if (!spoiler) {
    return notFound()
  }

  const seedParams = hashToParams(hash)
  const seedNum = seedParams.seed
  const sig = prefetchSignature(seedNum)
  const bosses = spoiler['Bosses']
  const areas = spoiler['Area Transitions']
  const items = spoiler['Items']

  return (
    <main className={styles.container}>
      <h1 className={styles.logo}>DASH</h1>
      <div className={styles.signature}>{sig || <>&nbsp;</>}</div>
      <div style={{ marginTop: '32px' }} />
      <DownloadButton raceKey={key} data={data.spoiler} />
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
          <Link href={`/race/${key}`}>Return to Seed Page</Link>
        </p>
      </footer>
    </main>
  )
}
