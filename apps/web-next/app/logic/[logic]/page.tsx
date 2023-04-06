import { getFns } from "./getFns"
import Code from '@/app/components/code'
import Type from '@/app/components/typography'
import Body, { Caption } from '@/app/components/text'
import styles from './page.module.css'
import { ExternalLink, Link as LinkIcon } from 'react-feather'
import Spacer from '@/app/components/spacer'
import Tabs from '@/app/components/tab'

type LogicParams = {
  logic: string
}

export default async function LogicPage({ params }: { params: LogicParams }) {
  const checks: any[] = await getFns()
  return (
    <main className={styles.main}>
      <div>
        {checks.map((check: any) => (
          <div key={check.key} className={styles.check}>
            <article className={styles.check_content}>
              <Type el="h2" weight="bold" family="mono" size="large" className={styles.title}>
                <span id={check.key} className={styles.anchor_spacer} />
                <a className={styles.header_link} href={`/logic/${params.logic}#${check.key}`}>
                  {check.key}
                  <span className={styles.link_icon}>
                    <LinkIcon size={14} />
                  </span>
                </a>
              </Type>
              <Spacer y={3} />
              {check.description}
            </article>
            <aside className={styles.sidebar}>
              <Tabs
                items={[
                  {
                    title: 'Requirements',
                    content: <Type family="mono" size="small" el="code">{check.requirements}</Type>,
                  },
                  {
                    title: 'Source',
                    content: (
                      <>
                        <Code>{check.fn}</Code>
                        <Spacer y={2} />
                        <Caption>
                          <a href={check.url} target="_blank" className={styles.external_link}>
                            View on Github
                            <span className={styles.external_icon}>
                              <ExternalLink size={12} />
                            </span>
                          </a>
                        </Caption>
                      </>
                    ),
                  }
                ]}
              />
            </aside>
          </div>
        ))}
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { logic: 'dash-recall' },
  ]
}
