import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import Time from './time'
import styles from './event.module.css'
import { PropsWithChildren } from 'react'

const Runner = ({ children }: PropsWithChildren) => (<span style={{ color: 'var(--color-highlight)'}}>{children}</span>)

export default function TournamentPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '48px', margin: '0' }}>
            DASH Team vs The World
          </h1>
          <h3 style={{ textTransform: 'uppercase', fontWeight: '400', fontSize: '20px', display: 'flex', justifyContent: 'center', gap: 'var(--spacer-4x)', color: 'var(--color-muted)', margin: '0' }}>
            <span><Time unit="date" /></span>
            <span><Time unit="time" /></span>
          </h3>
          <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
            3 races to showcase new DASH capabilities including Multiworld, Chozo and more.
          </h2>
        </div>
        <div style={{ margin: 'var(--spacer-32x) 0 var(--spacer-12x)'}}>
          <h3 style={{ color: '#fff', fontWeight: '400', fontSize: '36px', margin: '0', textAlign: 'center' }}>Schedule</h3>
          <ul className={styles.gamesList}>
            <li>
              <div>
                <p>3pm on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
              </div>
              <div>
                <p>
                  <Runner>kupppo</Runner> & <Runner>MassHesteria</Runner><span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span><Runner>AceZer0</Runner> & <Runner>ProfessorSchool</Runner>
                  <br />
                  Chozo Bozo, Multitroid
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>4pm on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
              </div>
              <div>
                <p>
                  <Runner>PapaSchmo</Runner> & <Runner>derp</Runner><span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span><Runner>bressingham</Runner> & <Runner>mm2nescartridge</Runner>
                  <br />
                  Chozo, Area Randomization, Bosses Shifted, Multitroid
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>5pm on <a href="https://twitch.tv/speedgaming" target="_blank" rel="noreferrer noopener">SpeedGaming</a></p>
              </div>
              <div>
                <p>
                  <Runner>Kipp</Runner> & <Runner>cassidymoen</Runner><span style={{ display: 'inline-block', margin: '0 var(--spacer-2x)' }}>vs</span><Runner>Zeb316</Runner> & <Runner>d_webb</Runner>
                  <br />
                  Chozo, Area Randomization, Co-op
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}
