'use client'

import { formatInTimeZone } from 'date-fns-tz'

const timeFormats = {
  timeAMPM: 'h:mm a',
  time24: 'H:mm',
  timeMatch: 'haaa',
  date: 'MMM d, Y',
}

const getLocalRaceTime = (time: Date, tz: string, format: 'date' | 'time' | 'timeMatch') => {
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

export default function Time({ time, unit }: { time: Date, unit: 'date' | 'time' | 'timeMatch' }) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return <span suppressHydrationWarning>{getLocalRaceTime(time, tz, unit)}</span>
}
