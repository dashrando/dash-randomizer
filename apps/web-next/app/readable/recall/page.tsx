import ReadableLogic from "../readable"

export const metadata = {
  title: 'Readable Logic - DASH Recall',
  description: 'DASH Recall logic in a human readable format',
}

export default function RecallPage() {
   return (
      <ReadableLogic logicType="recall" />
   )
}