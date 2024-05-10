import { kv } from '@vercel/kv'
import styles from '../../../[seed]/seed.module.css'
import { prefetchSignature, stringToParams } from 'core'
import { notFound } from 'next/navigation'
import { ButtonLink } from '@/app/components/button'
import { ArrowDown } from 'react-feather'

type RaceSeedData = {
  hash: string
  key: string
  spoiler: Spoiler
}

type Spoiler = {
  'Area Transitions': {
    [transition: string]: string
  }
  Bosses: {
    [location: string]: string
  }
  Items: {
    [area: string]: {
      [location: string]: string
    }
  }
}

export default async function RaceSeedSpoilerPage({ params }: { params: { key: string } }) {
  const { key } = params
  const data = await kv.hgetall(`race-${key}`)
  if (!data) {
    return <div>Seed not found</div>
  }

  const { hash, spoiler } = data as RaceSeedData
  if (!spoiler) {
    return notFound()
  }

  const seedParams = stringToParams(hash)
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
      <ButtonLink variant="outline" href={`/seed/race/${key}/spoiler/download`}>
        <span>Download Spoiler</span>
        <>&nbsp;</>
        <ArrowDown size={14} strokeWidth={2} />
      </ButtonLink>
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
    </main>
  )
}
