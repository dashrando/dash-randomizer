'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './countdown.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function calculatePrevValue(input: string, maxValue: number) {
  const value = parseInt(input)
  const prev = value + 1
  if (prev >= maxValue) {
    return '0'
  }
  return prev.toString()
}

const Number = ({ maxValue, value }: { maxValue: number, value: string }) => {
  const nodeRef = useRef(null)
  const prevNodeRef = useRef(null)
  const prevValue = calculatePrevValue(value, maxValue)

  return (
    <div className={styles.numberWrapper}>
      <TransitionGroup>
        <CSSTransition
          key={prevValue}
          nodeRef={prevNodeRef}
          classNames={{
            exit: styles['animateNumber-exit'],
          }}
          timeout={300}
        >
          <span
            className={`${styles.number} ${styles.numberPrev}`}
            ref={prevNodeRef}
            suppressHydrationWarning
          >
            {prevValue}
          </span>
        </CSSTransition>
        <CSSTransition
          key={value}
          nodeRef={nodeRef}
          classNames={{
            enter: styles['animateNumber-enter'],
          }}
          timeout={300}
        >
          <span
            className={styles.number}
            ref={nodeRef}
            suppressHydrationWarning
          >
            {value}
          </span>
        </CSSTransition>
      </TransitionGroup>
      <span className={styles.placeholder} suppressHydrationWarning>{value}</span>
    </div>
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
          <Number maxValue={10} value={days[0]} />
          <Number maxValue={10} value={days[1]} />
        </div>
        <div className={styles.label}>Days</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number maxValue={3} value={hours[0]} />
          <Number maxValue={10} value={hours[1]} />
        </div>
        <div className={styles.label}>Hours</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number maxValue={6} value={minutes[0]} />
          <Number maxValue={10} value={minutes[1]} />
        </div>
        <div className={styles.label}>Minutes</div>
      </div>
      <div className={styles.countdown_unit}>
        <div className={styles.numbers}>
          <Number maxValue={6} value={seconds[0]} />
          <Number maxValue={10} value={seconds[1]} />
        </div>
        <div className={styles.label}>Seconds</div>
      </div>
    </div>
  )
}
