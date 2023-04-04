import { getFns } from "./getFns"

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
            <pre style={{ fontFamily: 'monospace' }}>{check.fn}</pre>
          </div>
        ))}
      </div>
    </main>
  )
}
