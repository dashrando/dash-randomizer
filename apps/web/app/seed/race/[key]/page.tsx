import { kv } from '@vercel/kv'
import { stringToParams } from 'core'
import { notFound } from 'next/navigation'

type RaceSeedData = {
  hash: string
  key: string
  mystery: boolean
  spoiler: object
}

export default async function RaceSeedPage({ params }: { params: { key: string } }) {
  const { key } = params
  const data = await kv.hgetall(`race-${key}`)
  if (!data) {
    return notFound()
  }

  const { hash, mystery, spoiler } = data as RaceSeedData
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
        {mystery && <p>This is a mystery seed</p>}
        <div>
          <pre>
            <code>{JSON.stringify(seedParams, null, 2)}</code>
          </pre>
        </div>
    </>
  )
}
