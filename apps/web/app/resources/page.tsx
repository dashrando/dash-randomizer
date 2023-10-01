import type { Metadata, NextPage } from 'next'
import Link from 'next/link'
import styles from './resources.module.css'

export const metadata: Metadata = {
  title: 'Resources - DASH',
  description: 'DASH Randomizer resources',
}

const ExternalLink = ({ href, children }: any) => (
  <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const Resource = ({
  title,
  children,
  image,
}: {
  title: string
  children: React.ReactNode
  image?: string
}) => {
  return (
    <div className={styles.resource}>
      <h3>{title}</h3>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.image}>
        {image && <img src={image} alt={title} />}
      </div>
    </div>
  )
}

const ResourcesPage: NextPage = () => {
   return (
    <>
      <section className={styles.section}>
        <h2>Trackers</h2>
        <Resource
          title="EmoTracker Packs for DASH Standard and DASH Recall"
          image="/images/Trackers_DASH_EmoTracker.png"
        >
          <p>For instructions on how to use autosplitting on console, check out these <ExternalLink href="https://www.youtube.com/watch?v=AUSSGh30dgA">SNES Classic</ExternalLink> and <ExternalLink href="https://www.youtube.com/watch?v=q05qSIuYcKw">FXPak/SD2Snes</ExternalLink> tutorial videos! (If you don&apos;t have EmoTracker, you can download <ExternalLink href="https://emotracker.net/download/">EmoTracker</ExternalLink> here)</p>
          <p>This plugin supports autotracking.</p>
        </Resource>
        <div className={styles.seperator} />
        <Resource
          title="Web Browser Manual Tracker for DASH Recall"
          image="/images/Tracker_Recall_Rumbleminze.png"
        >
          <p>
            <Link href="/tracker" className={styles.link}>Launch the Web Tracker</Link>
          </p>
        </Resource>
      </section>
      <section className={styles.section}>
        <h2>Custom Sprites</h2>
        <Resource title="Sprite Something" image="/images/SpriteSomething_Example.png">
          <p>
            <ExternalLink href="https://github.com/Artheau/SpriteSomething/releases">SpriteSomething</ExternalLink> is a utility which allows custom sprites to be used in retro games like Super Metroid.
          </p>
          <p>
            All DASH seeds are compatible with <ExternalLink href="https://github.com/Artheau/SpriteSomething/releases">SpriteSomething</ExternalLink>.
          </p>
        </Resource>
      </section>
    </>
   )
}

export default ResourcesPage
