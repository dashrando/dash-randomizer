import { Wrapper } from '@/app/components/wrapper'
import Time from './time'
import Countdown from './countdown'
import styles from './event.module.css'
import { PropsWithChildren } from 'react'
import Video from '@/app/video'
import { MATCHES } from './data'

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
              <span><Time time={MATCHES[0]} unit="date" /></span>
              <span><Time time={MATCHES[0]} unit="time" /></span>
            </h3>
            <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
              3 races to showcase new DASH capabilities including Multitroid, Chozo and more.
            </h2>
          </div>
          <Countdown launchTime={MATCHES[0]} />
          <div style={{ margin: 'var(--spacer-32x) 0 var(--spacer-12x)'}}>
            <h3 className={styles.scheduleTitle}>Schedule</h3>
            <ul className={styles.gamesList}>
              <li>
                <div className={styles.gameTime}>
                  <p><Time time={MATCHES[0]} unit="timeMatch" /> on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
                </div>
                <div className={styles.gameDetails}>
                  <p>
                    <span className={styles.runnersTeam}>
                      <Runner>kupppo</Runner> & <Runner>MassHesteria</Runner>
                      <span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span>
                    </span>
                    <span className={styles.runnersTeam}><Runner>AceZer0</Runner> & <Runner>ProfessorSchool</Runner></span>
                    <br />
                    Chozo Bozo, Multitroid
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.gameTime}>
                  <p><Time time={MATCHES[1]} unit="timeMatch" /> on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
                </div>
                <div className={styles.gameDetails}>
                  <p>
                    <span className={styles.runnersTeam}>
                      <Runner>PapaSchmo</Runner> & <Runner>derp</Runner>
                      <span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span>
                    </span>
                    <span className={styles.runnersTeam}><Runner>bressingham</Runner> & <Runner>mm2nescartridge</Runner></span>
                    <br />
                    Chozo, Area Randomization, Bosses Shifted, Multitroid
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.gameTime}>
                  <p><Time time={MATCHES[2]} unit="timeMatch" /> on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
                </div>
                <div className={styles.gameDetails}>
                  <p>
                    <span className={styles.runnersTeam}>
                      <Runner>Kipp</Runner> & <Runner>cassidymoen</Runner>
                      <span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span>
                    </span>
                    <span className={styles.runnersTeam}><Runner>Zeb316</Runner> & <Runner>d_webb</Runner></span>
                    <br />
                    Chozo, Area Randomization, Co-op
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
