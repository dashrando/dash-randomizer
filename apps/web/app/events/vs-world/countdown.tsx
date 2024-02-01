'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import styles from './countdown.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useMounted from '@/app/hooks/useMounted'

function calculatePrevValue(input: string, maxValue: number) {
  const value = parseInt(input)
  const prev = value + 1
  if (prev >= maxValue) {
    return '0'
  }
  return prev.toString()
}

function calculateTimeLeft(launchTime: Date, timeLeft: Date) {
  const days = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0').split('')
  const hours = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60 * 60) % 24).toString().padStart(2, '0').split('')
  const minutes = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000 * 60) % 60).toString().padStart(2, '0').split('')
  const seconds = Math.floor((launchTime.getTime() - timeLeft.getTime()) / (1000) % 60).toString().padStart(2, '0').split('')
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

const Number = ({ maxValue, value }: { maxValue: number, value: string }) => {
  const nodeRef = useRef(null)
  const prevNodeRef = useRef(null)
  const [prevValue, setPrevValue] = useState<string>(calculatePrevValue(value, maxValue))

  useEffect(() => {
    setPrevValue(calculatePrevValue(value, maxValue))
  }, [maxValue, value])

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

export type TimeLeft = {
  days: string[]
  hours: string[]
  minutes: string[]
  seconds: string[]
}

const Placeholder = () => (
  <div className={styles.wrapper}>
    <div className={styles.countdown_unit}>
      <div className={styles.numbers}>
        <span className={styles.placeholder} suppressHydrationWarning>0</span>
      </div>
      <div className={styles.label}>Days</div>
    </div>
    <div className={styles.countdown_unit}>
      <div className={styles.numbers}>
        <span className={styles.placeholder} suppressHydrationWarning>0</span>
      </div>
      <div className={styles.label}>Hours</div>
    </div>
    <div className={styles.countdown_unit}>
      <div className={styles.numbers}>
        <span className={styles.placeholder} suppressHydrationWarning>0</span>
      </div>
      <div className={styles.label}>Minutes</div>
    </div>
    <div className={styles.countdown_unit}>
      <div className={styles.numbers}>
        <span className={styles.placeholder} suppressHydrationWarning>0</span>
      </div>
      <div className={styles.label}>Seconds</div>
    </div>
  </div>
)

export default function Countdown({ launchTime } : { launchTime: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(launchTime, new Date()))
  const mounted = useMounted()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newValue = calculateTimeLeft(launchTime, now)
      setTimeLeft(newValue)
    }, 1000);

    return () => clearInterval(interval);
  }, [launchTime, setTimeLeft])

  if (!mounted) {
    return <Placeholder />
  }

  return (
    <Suspense fallback={<Placeholder />} key={mounted ? 'coutdown-mounted' : 'countdown-pending'}>
      <div className={styles.wrapper}>
        <div className={styles.countdown_unit}>
          <div className={styles.numbers}>
            <Number maxValue={10} value={timeLeft.days[0]} />
            <Number maxValue={10} value={timeLeft.days[1]} />
          </div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles.countdown_unit}>
          <div className={styles.numbers}>
            <Number maxValue={3} value={timeLeft.hours[0]} />
            <Number maxValue={10} value={timeLeft.hours[1]} />
          </div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles.countdown_unit}>
          <div className={styles.numbers}>
            <Number maxValue={6} value={timeLeft.minutes[0]} />
            <Number maxValue={10} value={timeLeft.minutes[1]} />
          </div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles.countdown_unit}>
          <div className={styles.numbers}>
            <Number maxValue={6} value={timeLeft.seconds[0]} />
            <Number maxValue={10} value={timeLeft.seconds[1]} />
          </div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
    </Suspense>
  )
}
