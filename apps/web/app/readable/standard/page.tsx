import type { Metadata, NextPage } from 'next'
import LogicPage from "../readable"
import { Wrapper } from '@/app/components/wrapper'

export const metadata = {
  title: 'Readable Logic - DASH Standard',
  description: 'DASH Standard logic in a human readable format',
}

const StandardLogicPage: NextPage = () => {
   return (
      <Wrapper>
         <LogicPage type="standard" />
      </Wrapper>
   )
}

export default StandardLogicPage
