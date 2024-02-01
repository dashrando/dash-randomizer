import { Wrapper } from '@/app/components/wrapper'
import Time from './time'
import Countdown from './countdown'
import styles from './event.module.css'
import { PropsWithChildren } from 'react'
import Video from '@/app/video'
import { RACES, START_TIME } from './data'

export const metadata = {
  title: 'DASH Team vs The World - Feb 4th, 2024',
  description: 'A showcase of new DASH capabilities including Multitroid and Chozo',
}

const Runner = ({ children }: PropsWithChildren) => (<span style={{ color: 'var(--color-highlight)'}}>{children}</span>)

export default function TournamentPage() {

  return (
    <>
      <Video videoSrc="/vs-bg.mp4" fallbackSrc="/vs-bg.png" />
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '48px', margin: '0' }}>
              DASH Team vs The World
            </h1>
            <h3 style={{ textTransform: 'uppercase', fontWeight: '400', fontSize: '20px', display: 'flex', justifyContent: 'center', gap: 'var(--spacer-4x)', color: 'var(--color-muted)', margin: '0' }}>
              <span><Time time={START_TIME} unit="date" /></span>
              <span><Time time={START_TIME} unit="time" /></span>
            </h3>
            <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
              3 races to showcase new DASH capabilities including Multitroid, Chozo and more.
            </h2>
          </div>
          <Countdown launchTime={START_TIME} />
          <div style={{ margin: 'var(--spacer-32x) 0 var(--spacer-12x)'}}>
            <h3 className={styles.scheduleTitle}>Schedule</h3>
            <ul className={styles.gamesList}>
              {RACES.map((race) => (
                <li key={race.id}>
                  <div className={styles.gameTime}>
                    <p><Time time={race.time} unit="timeMatch" /> on <a href={`https://twitch.tv/${race.channel.handle}`} target="_blank" rel="noreferrer noopener">{race.channel.name}</a></p>
                  </div>
                  <div className={styles.gameDetails}>
                    <p>
                      <span className={styles.runnersTeam}>
                        <Runner>{race.runners[0][0]}</Runner> & <Runner>{race.runners[0][1]}</Runner>
                        <span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span>
                      </span>
                      <span className={styles.runnersTeam}><Runner>{race.runners[1][0]}</Runner> & <Runner>{race.runners[1][1]}</Runner></span>
                      <br />
                      {race.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
