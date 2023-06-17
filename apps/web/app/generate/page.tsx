import type { Metadata, NextPage } from 'next'
import styles from './page.module.css'
import Form from './form'

const GeneratePage: NextPage = () => {
  return (
    <div>
      <main className={styles.container}>
        <Form />
      </main>
    </div>
  )
}

export default GeneratePage

export const metadata: Metadata = {
  title: 'DASH Randomizer - Generate',
  description: 'Generate DASH randomized seed',
}
