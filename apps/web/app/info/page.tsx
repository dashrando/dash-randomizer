import Badge from '../components/badge'
import Link from 'next/link'
import { Wrapper } from '../components/wrapper'
import styles from './info.module.css'
import Spacer from '../components/spacer'

type InfoArticle = {
  title: string
  href: string
  description: string | React.ReactNode
}

const InfoArticles: InfoArticle[] = [
  {
    title: 'Settings',
    href: '/info/settings',
    description: 'Learn about the available settings and options when generating a seed.',
  },
  {
    title: 'Heads Up Display',
    href: '/info/hud',
    description: 'DASH uses a customized HUD to provide info to players in the game.',
  },
  {
    title: 'Surprise Bosses',
    href: '/info/surprise',
    description: 'Surprise Bosses is a boss randomization mode allowing duplicates.',
  },
  {
    title: 'Area Randomization',
    href: '/info/area',
    description: 'Area Randomization creates unique map layouts for exploration.',
  },
  {
    title: 'Verified Fill',
    href: '/info/verified-fill',
    description: 'Read about Verified Fill and how it ensures seeds are completable.',
  },
  {
    title: 'Item Pools',
    href: '/info/item-pools',
    description: 'Learn how item pools are created in DASH.',
  },
  {
    title: 'DASH: Classic',
    href: '/info/classic',
    description: 'The original DASH mode lives on as a preset.',
  },
  {
    title: 'Canary',
    href: '/info/canary',
    description: 'Canary is our official preview environment for new features.',
  },
  {
    title: 'About',
    href: '/info/about',
    description: 'Learn about DASH.',
  }
]

export default function InfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <ul className={styles.list}>
          {InfoArticles.map((article) => (
            <li className={styles.list_item} key={article.href}>
              <Link href={article.href} className={styles.list_link}>
                <h2 className={styles.list_title}>{article.title}</h2>
                <p>{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}
