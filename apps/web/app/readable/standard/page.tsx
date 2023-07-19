import type { Metadata, NextPage } from 'next'
import LogicPage from "../readable"

export const metadata: Metadata = {
  title: 'Readable Logic - DASH Standard',
  description: 'DASH Standard logic in a human readable format',
}

const StandardLogicPage: NextPage = () => {
   return (
      <LogicPage type="standard" />
   )
}

export default StandardLogicPage
