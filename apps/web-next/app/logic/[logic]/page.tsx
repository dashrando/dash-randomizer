import { getFns } from "./getFns"
import Code from '@/app/components/code'
import Type from '@/app/components/typography'
import styles from './page.module.css'

type LogicParams = {
  logic: string
}

export default async function LogicPage({ params }: { params: LogicParams }) {
  const checks: any[] = await getFns()
  return (
    <main style={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
      <div>
        {checks.map((check: any) => (
          <div key={check.key}>
            <h2 className={styles.title}>
              <span id={check.key} className={styles.anchor_spacer} />
              <a className={styles.header_link} href={`/logic/${params.logic}#${check.key}`}>
                {check.key}
              </a>
            </h2>
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
