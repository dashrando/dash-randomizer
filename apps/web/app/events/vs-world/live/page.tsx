import { Wrapper } from '@/app/components/wrapper'
import styles from '../page.module.css'
import { PropsWithChildren } from 'react'
import { MATCHES } from '../data'
import Time from '../time'
import { cn } from '@/lib/utils'
import Badge from '@/app/components/badge'
import { TwitchStream, TwitchChat } from './twitch'

export const metadata = {
  title: 'Chozo Showcase - DASH',
  description: 'A live showcase of the Chozo logic preset for DASH.',
}

const Runner = ({ children }: PropsWithChildren) => <span style={{ color: 'var(--color-highlight)' }}>{children}</span>

type RaceProps = {
  time: Date
  runners: string[]
  status: 'upcoming' | 'live' | 'past'
}

const Race = ({ runners, status, time }: RaceProps) => (
  <li className={cn(styles.race, styles[`race-${status}`])}>
    <div className={styles.raceContent}>
      <Runner>{runners[0]}</Runner> & <Runner>{runners[1]}</Runner>
      <span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span>
      <Runner>{runners[2]}</Runner> & <Runner>{runners[3]}</Runner>
      <br />
      <div className={cn(styles.raceTime, status === 'live' && styles.raceTimeLive)}>
        <span className={styles.scheduledTime}>
          <Time time={time} unit="timeMatch" /> on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a>
        </span>
        <div className={styles.liveBadge}>
          <Badge variant="early" size="small">LIVE</Badge>
        </div>
      </div>
    </div>
  </li>
)

export default function LivePage() {
  return (
    <Wrapper fullWidth={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <TwitchStream />
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.schedule}>
            <h1 className={styles.title}>DASH Team vs The World</h1>
            <ul className={styles.races}>
              <Race status="past" runners={['kupppo', 'MassHesteria', 'AceZer0', 'ProfessorSchool']} time={MATCHES[0]} />
              <Race status="live" runners={['PapaSchmo', 'derp', 'bressingham', 'mm2nescartridge']} time={MATCHES[1]} />
              <Race status="upcoming" runners={['Kipp', 'cassidymoen', 'Zeb316', 'd_webb']} time={MATCHES[2]} />
            </ul>
          </div>
          <TwitchChat />
        </aside>
      </div>
    </Wrapper>
  )
}
