import { getSeedData, saveSeedData } from '@/lib/seed-data';
import { hashToParams } from '@/lib/settings';
import { encodeSeed } from 'core';
import { generateSeed } from 'core/data';
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params : { key: string }}) {
  return {
    title: `DASH Randomizer Race`,
    description: params.key
  }
}

export default async function RaceSeedPage({ params }: { params: { key: string } }) {
  const data = await getSeedData(params.key, false)
  if (data === null) {
    const legacyData = await getSeedData(params.key, true)
    if (legacyData === null) {
      return <>Could not find race seed: {params.key}</>
    }
    const seedParams = hashToParams(legacyData.hash)
    const graph = generateSeed(seedParams.seed, seedParams.settings, seedParams.options)
    const encoded = encodeSeed(seedParams, graph)
    await saveSeedData(params.key, encoded, legacyData.mystery, true, false)
  }
  redirect(`/seed/${params.key}`);
  return <></>
}