'use client'

import ReactPlayer from 'react-player'
import useMounted from './hooks/useMounted'
import styles from './video.module.css'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const HomeVideo = () => {
  const mounted = useMounted()
  const [ready, setReady] = useState(false)
  if (!mounted) {
    return null
  }

  return (
    <div className={cn(styles.container, ready && styles.ready)}>
      <ReactPlayer
        url="/recall-bg.mp4"
        playing
        loop
        muted
        playsinline
        controls={false}
        className={styles.video}
        width="100%"
        height="100%"
        onReady={() => {
          setReady(true)
        }}
      />
      <div className={styles.fallback}>
        <img src="/recall-bg.png" alt="DASH Recall" />
      </div>
    </div>
  )
}

export default HomeVideo
