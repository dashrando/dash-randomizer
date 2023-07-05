import type { Metadata, NextPage } from 'next'
import styles from './page.module.css'
import Form from './form'
import { Layout } from '@/app/components/layout'

const GeneratePage: NextPage = () => {
  return (
    <Layout>
      <Form />
    </Layout>
  )
}

export default GeneratePage

export const metadata: Metadata = {
  title: 'DASH Randomizer - Generate',
  description: 'Generate DASH randomized seed',
}
