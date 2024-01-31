'use client'

import ReactPlayer from 'react-player'
import useMounted from './hooks/useMounted'
import styles from './video.module.css'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const Video = ({
  videoSrc,
  fallbackSrc,
  alt,
} : {
  videoSrc: string,
  fallbackSrc?: string,
  alt?: string,
}) => {
  const mounted = useMounted()
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  if (!mounted) {
    return null
  }

  return (
    <div className={cn(styles.container, ready && styles.ready, fallback && styles.show_fallback)}>
      <ReactPlayer
        url={videoSrc}
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
        onError={() => {
          setFallback(true)
        }}
      />
      {fallbackSrc && (
        <div className={styles.fallback}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fallbackSrc} alt={alt} />
        </div>
      )}
    </div>
  )
}

export default Video
