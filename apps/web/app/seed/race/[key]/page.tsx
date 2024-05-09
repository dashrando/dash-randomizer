import { kv } from '@vercel/kv'
import { stringToParams } from 'core'

export default async function RaceSeedPage({ params }: { params: { key: string } }) {
  const { key } = params
  const hash = await kv.hget<string>(`race-${key}`, 'hash')
  const spoiler = await kv.hget<string>(`race-${key}`, 'spoiler')
  const seedParams = hash ? stringToParams(hash) : null
  return (<>
  <div>Race Seed</div>
  <p>
  {spoiler !== null &&
  <a href={`/seed/race/${key}/spoiler`}>Spoiler</a>
  }
  </p>
  <div>{JSON.stringify(seedParams, null, 2)}</div>
  </>)
}
