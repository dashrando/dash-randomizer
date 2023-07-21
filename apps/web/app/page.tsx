import type { Metadata, NextPage } from 'next'
import Link from 'next/link'
import { Wrapper } from './components/wrapper'
import styles from './home.module.css'
import Video from './video'
import { ButtonLink } from './components/button'

export const metadata: Metadata = {
  title: 'DASH',
  description: 'DASH is a Super Metroid Randomizer',
}


const Homepage: NextPage = () => {
   return (
    <>
      <Video />
      <Wrapper borderless>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>DASH: Recall</h1>
            <h2>A reimagining and rebalancing logic</h2>
            <div className={styles.actions}>
              <ButtonLink href="/generate" variant="primary" className={styles.primaryCTA}>
                Generate a Seed
              </ButtonLink>
              <ButtonLink href="/info/recall" variant="secondary" className={styles.secondaryCTA}>
                Learn more
              </ButtonLink>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
   )
}

export default Homepage
