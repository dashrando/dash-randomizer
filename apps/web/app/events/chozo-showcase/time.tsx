'use client'

import { formatInTimeZone } from 'date-fns-tz'

const START_TIME = new Date('2024-02-04T20:00:00.000Z')

const timeFormats = {
  timeAMPM: 'h:mm a',
  time24: 'H:mm',
  date: 'MMM d, Y',
}

const getLocalRaceTime = (time: Date, tz: string, format: 'date' | 'time') => {
  try {
    const formatKey = format === 'time' ? (formatAMPM(time, tz) ? 'timeAMPM' : 'time24') : format
    return formatInTimeZone(time, tz, timeFormats[formatKey])
  } catch (err) {
    return <>&mdash;</>
  }
}

const formatAMPM = (time: Date, tz: string) => {
  try {
    const timeString = time.toLocaleTimeString([], { hour12: true })
    return timeString.includes('AM') || timeString.includes('PM')
  } catch (err) {
    return false
  }
}

export default function Time({ unit }: { unit: 'date' | 'time' }) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return <span suppressHydrationWarning>{getLocalRaceTime(START_TIME, tz, unit)}</span>
}
