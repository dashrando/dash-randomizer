import { kv } from '@vercel/kv'

export default async function RaceSeedSpoilerPage({ params }: { params: { key: string } }) {
  const { key } = params
  const spoiler = await kv.hget<string>(`race-${key}`, 'spoiler')
  return (
    <>
  <div>Race Seed Spoiler</div>
  <p>{JSON.stringify(spoiler, null, 2)}</p>
  <a href={`/seed/race/${key}/spoiler/download`}>Spoiler</a>
  </>
  )
}
