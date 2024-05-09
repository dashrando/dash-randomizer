import { kv } from '@vercel/kv'

type RaceSeedData = {
  hash: string
  key: string
  spoiler: object
}

export default async function RaceSeedSpoilerPage({ params }: { params: { key: string } }) {
  const { key } = params
  const data = await kv.hgetall(`race-${key}`)
  if (!data) {
    return <div>Seed not found</div>
  }

  const { hash, spoiler } = data as RaceSeedData
  return (
    <>
      <div>Race Seed Spoiler</div>
      <p>{JSON.stringify(spoiler, null, 2)}</p>
      <a href={`/seed/race/${key}/spoiler/download`}>Download Spoiler</a>
    </>
  )
}
