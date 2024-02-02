'use client'

import { useEffect, useState } from 'react'
import useLiveRace from '@/app/hooks/useLiveRace'
import styles from '../page.module.css'
import { RACES } from '../data'
import { get } from 'http'

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
    console.log('redirect to homepage')
  }

  const race = getRace(live?.id)
  if (!race) {
    return null
  }

  if (!hostname) {
    return null
  }

  return (
    <div className={styles.embedContainer}>
      <div className={styles.embed}>
        <iframe
          src={`https://player.twitch.tv/?channel=${race.channel.handle}&parent=${hostname}`}
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

  return (
    <div className={styles.chatEmbed}>
      <iframe
        src={`https://www.twitch.tv/embed/${race.channel.handle}/chat?darkpopout&parent=${hostname}`}
        height="100%"
        width="100%"
      />
    </div>
  )
}