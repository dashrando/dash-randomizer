'use client'

import { useState, useEffect } from 'react'
import styles from './countdown.module.css'

const Number = ({ children }: React.PropsWithChildren) => (
  <span className={styles.number} suppressHydrationWarning>{children}</span>
)

export default function Countdown({ launchTime } : { launchTime: Date }) {
  const [timeLeft, setTimeLeft] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setTimeLeft(now)
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const days = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0').split('')
  const hours = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60 * 60) % 24).toString().padStart(2, '0').split('')
  const minutes = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60) % 60).toString().padStart(2, '0').split('')
  const seconds = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000) % 60).toString().padStart(2, '0').split('')

  return (
    <div className={styles.wrapper}>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number>{days[0]}</Number>
          <Number>{days[1]}</Number>
        </div>
        <div className={styles.label}>Days</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number>{hours[0]}</Number>
          <Number>{hours[1]}</Number>
        </div>
        <div className={styles.label}>Hours</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number>{minutes[0]}</Number>
          <Number>{minutes[1]}</Number>
        </div>
        <div className={styles.label}>Minutes</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number>{seconds[0]}</Number>
          <Number>{seconds[1]}</Number>
        </div>
        <div className={styles.label}>Seconds</div>
      </div>
    </div>
  )
}
