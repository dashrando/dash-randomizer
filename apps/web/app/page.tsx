import type { Metadata, NextPage } from 'next'
import Link from 'next/link'
import { Wrapper } from './components/wrapper'
import styles from './home.module.css'
import Video from './video'

export const metadata: Metadata = {
  title: 'DASH',
  description: 'DASH is a Super Metroid Randomizer',
}


const Homepage: NextPage = () => {
   return (
    <>
      <Video />
      <Wrapper borderless>
        <h1>Homepage</h1>
      </Wrapper>
    </>
   )
}

export default Homepage
