'use client'

import { useEffect, useState } from 'react'
import styles from '../page.module.css'

const useHostname = () => {

}

export const TwitchStream =() => {
  const [hostname, setHostname] = useState<string|null>(null)

  useEffect(() => {
    if (window) {
      setHostname(window.location.hostname)
    }
  }, [])

  if (!hostname) {
    return null
  }

  return (
    <div className={styles.embedContainer}>
      <div className={styles.embed}>
        <iframe
          src={`https://player.twitch.tv/?channel=speedgaming&parent=${hostname}`}
          height="450"
          width="800"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export const TwitchChat =() => {
  const [hostname, setHostname] = useState<string|null>(null)

  useEffect(() => {
    if (window) {
      setHostname(window.location.hostname)
    }
  }, [])

  if (!hostname) {
    return null
  }

  return (
    <div className={styles.chatEmbed}>
      <iframe
        src={`https://www.twitch.tv/embed/speedgaming/chat?darkpopout&parent=${hostname}`}
        height="100%"
        width="100%"
      />
    </div>
  )
}