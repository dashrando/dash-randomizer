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
            <h1>DASH at SGL 2023</h1>
            <h2>An on-site tournament for all runners November 9-12</h2>
            <div className={styles.actions}>
              <ButtonLink href="/generate" variant="primary" className={styles.primaryCTA}>
                Generate a Seed
              </ButtonLink>
              <ButtonLink href="/info" variant="secondary" className={styles.secondaryCTA}>
                Learn more
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className={styles.about}>
          <h3>About DASH</h3>
          <p>The <strong>DASH</strong> (<em>Diversity and Selective Haste</em>) Super Metroid Randomizer seeks to provide more options for runners to complete seeds by limiting the gating potential of certain items and item locations. DASH is based on the <a href="https://itemrando.supermetroid.run/">Super Metroid Item Randomizer</a> developed by Total and featured in the 2017 Super Metroid Randomizer Tournament.</p>
        </div>
      </Wrapper>
    </>
   )
}

export default Homepage
