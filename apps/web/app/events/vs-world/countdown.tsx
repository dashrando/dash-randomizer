'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './countdown.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Number = ({ value }: { value: string }) => {
  const nodeRef = useRef(null)
  return (
    <TransitionGroup className="wah">
      <CSSTransition
        nodeRef={nodeRef}
        key={value}
        classNames={{
          enter: styles['animateNumber-enter'],
          enterActive: styles['animateNumber-enter'],
          exit: styles['animateNumber-exit'],
          exitActive: styles['animateNumber-exit'],
        }}
        timeout={400}
      >
        <div
          ref={nodeRef}
          className={styles.number}
          suppressHydrationWarning
        >
          {value}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

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
          <Number value={days[0]} />
          <Number value={days[1]} />
        </div>
        <div className={styles.label}>Days</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number value={hours[0]} />
          <Number value={hours[1]} />
        </div>
        <div className={styles.label}>Hours</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number value={minutes[0]} />
          <Number value={minutes[1]} />
        </div>
        <div className={styles.label}>Minutes</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number value={seconds[0]} />
          <Number value={seconds[1]} />
        </div>
        <div className={styles.label}>Seconds</div>
      </div>
    </div>
  )
}
