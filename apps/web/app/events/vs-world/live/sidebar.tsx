'use client'

import styles from '../page.module.css'
import { RACES } from '../data'
import { PropsWithChildren } from 'react'
import Time from '../time'
import { cn } from '@/lib/utils'
import Badge from '@/app/components/badge'
import { TwitchChat } from './twitch'
import useLiveRace from '@/app/hooks/useLiveRace'
import useAdmin from '@/app/hooks/useAdmin'
import Button from '@/app/components/button'
import { toast } from 'sonner'
import usePartySocket from 'partysocket/react'
import { PARTYKIT_HOST } from '@/lib/env'
import PartySocket from 'partysocket'

const Runner = ({ children }: PropsWithChildren) => <span style={{ color: 'var(--color-highlight)' }}>{children}</span>

const getStatus = (raceId: number, liveId: number|null = null) => {
  try {
    if (liveId === null) {
      return 'upcoming'
    }
    if (raceId === liveId) {
      return 'live'
    }
    if (raceId < liveId) {
      return 'past'
    }
    return 'upcoming'
  } catch (err) {
    return 'upcoming'
  }
}

type RaceProps = {
  id: number
  time: Date
  runners: string[]
  status: 'upcoming' | 'live' | 'past'
  admin: boolean
}

const AdminLivePanel = ({ id }: { id: number }) => {
  return (
    <div className={styles.adminPanel}>
      <form onSubmit={async (evt: any) => {
        evt.preventDefault()
        const res = await fetch('/events/vs-world/admin/update', {
          method: 'POST',
          body: JSON.stringify({ id }),
        })
        if (res.ok) {
          toast(`Race ${id} was set to live`)
          await PartySocket.fetch({
            host: PARTYKIT_HOST,
            room: 'vs-world',
          }, {
            method: 'POST',
            body: JSON.stringify({ id }),
          })
        }
      }}>
        <Button variant="primary">Go Live</Button>
      </form>
    </div>
  )
}

const Race = ({ id, runners, status, time, admin = false }: RaceProps) => (
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
      {admin && status === 'upcoming' && <AdminLivePanel id={id} />}
    </div>
  </li>
)

export default function LiveSidebar() {
  const { data: live, mutate: fetchLive } = useLiveRace()
  const { isAdmin } = useAdmin()

  usePartySocket({
    host: PARTYKIT_HOST,
    room: 'vs-world',
    onMessage(event) {
      console.log('message', event.data)
      fetchLive()
    },
  })
  return (
    <aside className={styles.sidebar}>
      <div className={styles.schedule}>
        <h1 className={styles.title}>DASH Team vs The World</h1>
        <ul className={styles.races}>
          {RACES.map((race) => {
            const status = getStatus(race.id, live?.id)
            return (
              <Race
                key={race.id}
                id={race.id}
                runners={race.runners.flat()}
                status={status}
                time={race.time}
                admin={isAdmin}
              />
            )}
          )}
        </ul>
      </div>
      <TwitchChat />
    </aside>
  )
}
