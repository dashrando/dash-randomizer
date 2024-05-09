import { kv } from '@vercel/kv'
import { stringToParams } from 'core'

type RaceSeedData = {
  hash: string
  key: string
  spoiler: object
}

export default async function RaceSeedPage({ params }: { params: { key: string } }) {
  const { key } = params
  const data = await kv.hgetall(`race-${key}`)
  const { hash, spoiler } = data as RaceSeedData
  const seedParams = hash ? stringToParams(hash) : null
  return (
    <>
      <div>Race Seed</div>
        {spoiler && (
          <p>
            <a href={`/seed/race/${key}/spoiler`}>View Spoiler</a>
            <br />
            <a href={`/seed/race/${key}/spoiler/download`}>Download Spoiler</a>
          </p>
        )}
        <div>
          <pre>
            <code>{JSON.stringify(seedParams, null, 2)}</code>
          </pre>
        </div>
    </>
  )
}
