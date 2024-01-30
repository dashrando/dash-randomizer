import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import { formatInTimeZone } from 'date-fns-tz'
import styles from './info.module.css'

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

export default function TournamentPage() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '48px', margin: '0' }}>Chozo Showcase</h1>
          <h3 style={{ textTransform: 'uppercase', fontWeight: '400', fontSize: '20px', display: 'flex', justifyContent: 'center', gap: 'var(--spacer-4x)', color: 'var(--color-muted)', margin: '0' }}>
            <span>{getLocalRaceTime(START_TIME, tz, 'date')}</span>
            <span>{getLocalRaceTime(START_TIME, tz, 'time')}</span>
          </h3>
          <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
            3 races to showcase new DASH capabilities including Multiworld, Chozo and more.
          </h2>
        </div>
      </div>
    </Wrapper>
  )
}
