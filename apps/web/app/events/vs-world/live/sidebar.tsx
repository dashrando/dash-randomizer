'use client'

import styles from '../page.module.css'
import { RACES } from '../data'
import { PropsWithChildren } from 'react'
import Time from '../time'
import { cn } from '@/lib/utils'
import Badge from '@/app/components/badge'
import { TwitchChat } from './twitch'


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

export default function LiveSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.schedule}>
        <h1 className={styles.title}>DASH Team vs The World</h1>
        <ul className={styles.races}>
          {RACES.map((race) => (
            <Race key={race.id} runners={race.runners.flat()} status="upcoming" time={race.time} />
          ))}
        </ul>
      </div>
      <TwitchChat />
    </aside>
  )
}