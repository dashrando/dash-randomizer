import ReadableLogic from "../readable"

export const metadata = {
  title: 'Readable Logic - DASH Standard',
  description: 'DASH Standard logic in a human readable format',
}

export default function StandardPage() {
   return (
      <ReadableLogic logicType="standard" />
   )
}