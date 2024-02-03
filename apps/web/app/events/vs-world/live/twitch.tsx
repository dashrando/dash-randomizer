'use client'

import { useEffect, useState } from 'react'
import useLiveRace from '@/app/hooks/useLiveRace'
import styles from '../page.module.css'
import { RACES } from '../data'
import Countdown from '../countdown'

const useHostname = () => {
  const [hostname, setHostname] = useState<string|null>(null)
  useEffect(() => {
    if (window) {
      setHostname(window.location.hostname)
    }
  }, [])
  return hostname
}

const getRace = (id: number) => RACES.find((race) => race.id === id)

export const TwitchStream =() => {
  const hostname = useHostname()
  const { data: live } = useLiveRace()

  if (live && !live.active) {
    return <Countdown launchTime={RACES[0].time} />
  }

  const race = getRace(live?.id)
  if (!race) {
    return null
  }

  if (!hostname) {
    return null
  }

  const channel = live?.overrideChannel || race.channel.handle

  return (
    <div className={styles.embedContainer}>
      <div className={styles.embed}>
        <iframe
          src={`https://player.twitch.tv/?channel=${channel}&parent=${hostname}`}
          height="450"
          width="800"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export const TwitchChat =() => {
  const hostname = useHostname()
  const { data: live } = useLiveRace()

  if (!hostname) {
    return null
  }

  const race = getRace(live?.id)
  if (!race) {
    return null
  }

  const channel = live?.overrideChannel || race.channel.handle

  return (
    <div className={styles.chatEmbed}>
      <iframe
        src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&parent=${hostname}`}
        height="100%"
        width="100%"
      />
    </div>
  )
}