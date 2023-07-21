import type { Metadata, NextPage } from 'next'
import Form from './form'
import { Wrapper } from '@/app/components/wrapper'

const GeneratePage: NextPage = () => {
  return (
    <Wrapper>
      <Form />
    </Wrapper>
  )
}

export default GeneratePage

export const metadata: Metadata = {
  title: 'DASH Randomizer - Generate',
  description: 'Generate DASH randomized seed',
}
