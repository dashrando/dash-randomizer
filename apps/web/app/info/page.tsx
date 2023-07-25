import Badge from '../components/badge'
import Link from 'next/link'
import { Wrapper } from '../components/wrapper'
import { Link as LinkIcon } from 'react-feather'
import styles from './info.module.css'

const Title = ({ id, children }: { id: string, children: React.ReactNode }) => (
  <h2 className={styles.title}>
    <span className={styles.anchor_spacer} />
    <Link href={`#${id}`}>
      {children}
      <span className={styles.link_icon}>
        <LinkIcon size={14} />
      </span>
    </Link>
  </h2>
)

const Article = ({
  id,
  title,
  badge,
  children
}: {
  id: string,
  title: string,
  badge?: React.ReactNode,
  children: React.ReactNode
}) => (
  <article className={styles.article}>
    <header id={id}>
      {badge ? (
        <div className={styles.titleWithBadge}>
          <span>
            <Title id={id}>{title}</Title>
          </span>
          {badge}
        </div>
      ) : (
        <Title id={id}>{title}</Title>
      )}
    </header>
    {children}
  </article>
)

export default function Page() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Article id="vanilla" title="Vanilla">
          <p><strong>Vanilla</strong> refers to the original and unmodified Super Metroid game. The vanilla game will either be NTSC or PAL and will also be headered or unheadered. DASH uses an unheadered NTSC vanilla file in order to generate a seed.</p>
          <p>The <strong>header</strong> is the first 512 bytes of data in many .sfc and .smc files. This contains miscellaneous data that is unused. If you upload a headered file, DASH will attempt to remove the header automatically.</p>
          <p><strong>NTSC</strong> and <strong>PAL</strong> are video standards. NTSC is most commonly used today as it runs at 60Hz whereas PAL runs at 50Hz.</p>
        </Article>
        <Article id="mode" title="Mode">
          <p><strong>Mode</strong> is the combination of <a href="#item-split">Item Split</a>, <a href="#boss-shuffle">Boss Shuffle</a> and <a href="#area">Area Randomization</a>. DASH provides a few curated modes by default, but also allows you to change any of these values to create your own custom mode.</p>
        </Article>
        <Article id="item-split" title="Item Split">
          <p><strong>Item Split</strong> determines the available locations where major items can be placed.</p>
          <ul>
            <li>
              <p>
                <strong>Recall Major/minor</strong>: x
              </p>
            </li>
            <li>
              <p>
                <strong>Standard major/minor</strong>: x
              </p>
            </li>
            <li>
              <p>
                <strong>Full</strong>: All items are able to be placed in any location dictated by the logic.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="boss-shuffle"
          badge={<Badge variant="alpha">Alpha</Badge>}
          title="Boss Shuffle"
        >
          <p>
            <strong>Boss Shuffle</strong> can randomize the G4 boss found at a given boss location. For example, going to the boss location at Kraid&apos; warehouse might lead to Kraid, Phantoon, Draygon or Ridley. While the encountered boss might be at its expected location, at least one of the G4 bosses will not be in their vanilla location.
          </p>
          <ul>
            <li>
              <p>
                <strong>Standard</strong> disables this randomization and all G4 bosses will be at their vanilla locations.
              </p>
            </li>
            <li>
              <p>
                <strong>Randomized</strong> enables this randomization. At least one G4 boss will not be at its vanilla location.
              </p>
            </li>
            <li>
              <p style={{ marginBottom: 0 }}>
                <strong>Known</strong> will enable this randomization and also allow the boss randomization to be viewable from the pause screen.
              </p>
              <span style={{ display: 'block', height: 'var(--spacer-2x)' }} />
              <Badge>Coming soon</Badge>
            </li>
          </ul>
        </Article>
      </div>
    </Wrapper>
  )
}
