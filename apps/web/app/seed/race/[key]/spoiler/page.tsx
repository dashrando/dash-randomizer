import { kv } from '@vercel/kv'
import styles from '../../../[seed]/seed.module.css'
import { prefetchSignature, stringToParams } from 'core'
import { notFound } from 'next/navigation'

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
      <a href={`/seed/race/${key}/spoiler/download`} style={{ color: '#ffffff', display: 'block', marginTop: '2em' }}>Download Spoiler</a>
      <div className={styles.spoiler_data}>
        <h3>Bosses</h3>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Boss</th>
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

        <h3>Transitions</h3>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(areas).map((transition) => {
              return (
                <tr key={transition}>
                  <td>{transition}</td>
                  <td>{areas[transition]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <h3>Items</h3>
        {Object.keys(items).map((area) => (
          <div key={area}>
            <h4>{area}</h4>
            <table>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Item</th>
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
      </div>
    </main>
  )
}
