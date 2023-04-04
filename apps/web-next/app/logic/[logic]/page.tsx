import { getFns } from "./getFns"
import Code from '@/app/components/code'
import Type from '@/app/components/typography'

type LogicParams = {
  logic: string
}

export default async function LogicPage({ params }: { params: LogicParams }) {
  const checks: any[] = await getFns()
  return (
    <main>
      <h1>{params.logic}</h1>
      <div>
        {checks.map((check: any) => (
          <div key={check.key}>
            <h2>{check.key}</h2>
            {check.description}
            <Code>{check.fn}</Code>
            <Type size="small">
              <a href={check.url} target="_blank">View on Github</a>
            </Type>
          </div>
        ))}
      </div>
    </main>
  )
}
