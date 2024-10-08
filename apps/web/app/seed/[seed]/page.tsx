import Link from 'next/link'
import styles from './seed.module.css'
import Seed from './seed'
import { prefetchSignature } from 'core'
import Toaster from '../../components/toaster'
import { hashToParams } from '@/lib/settings'
import { notFound } from 'next/navigation'
import { getSeedData } from '@/lib/seed-data'

export async function generateMetadata(req: any) {
  const params = req.params
  const searchParams = req.searchParams
  const legacyRace = searchParams['lr']
  const data = await getSeedData(params.seed, legacyRace === '1')
  if (!data) {
    return {
      title: "DASH Randomizer Seed",
      description: "Invalid Seed"
    }
  }
  const settings = hashToParams(data.hash)
  const seedNum = settings.seed
  const description = data.race ? params.seed : prefetchSignature(seedNum)
  return {
    title: `DASH Randomizer Seed`,
    description
  }
}

export default async function SeedPage(req: any) {
  const params = req.params
  const searchParams = req.searchParams
  const legacyRace = searchParams['lr']
  const data = await getSeedData(params.seed, legacyRace === '1')
  if (!data) {
    return notFound()
  }
  const SeedFooter = () => {
    return (
      <footer className={styles.footer}>
        <p>
          This seed was generated by
          <br />
          <Link href="/">DASH Randomizer</Link>
        </p>
      </footer>
    );
  };

  const { hash, mystery, race, spoiler } = data
  const seedParams = hashToParams(hash)
  const seedNum = seedParams.seed
  const sig = prefetchSignature(seedNum)

  return (
    <main className={styles.container}>
      <h1 className={styles.logo}>DASH</h1>
      <Seed
        parameters={seedParams}
        hash={hash}
        signature={sig}
        slug={params.seed}
        race={race}
        mystery={mystery}
        spoiler={!!spoiler}
      />
      <SeedFooter />
      <Toaster />
    </main>
  );
}
