import type { Metadata, NextPage } from 'next'
import LogicPage from '../readable'

export const metadata: Metadata = {
  title: 'Readable Logic - DASH Recall',
  description: 'DASH Recall logic in a human readable format',
}

const RecallLogicPage: NextPage = () => {
   return (
      <LogicPage type="recall" />
   )
}

export default RecallLogicPage
