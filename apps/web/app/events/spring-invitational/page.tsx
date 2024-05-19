import { Wrapper } from '@/app/components/wrapper'
import styles from '../vs-world/event.module.css'

export const metadata = {
  title: 'DASH Spring Invitational',
  description: 'A DASH tournament for Chozo and Area Rando. May 23 - 27, 2024',
}

export default function TournamentPage() {

  return (
    <>
      <div style={{
        backgroundImage: 'url(/spring-24-bg.jpeg)',
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -999,
        opacity: 0.5,
      }} />
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '48px', margin: '0' }}>
              Spring Invitational 2024
            </h1>
            <h3 style={{ textTransform: 'uppercase', fontWeight: '400', fontSize: '20px', display: 'flex', justifyContent: 'center', gap: 'var(--spacer-4x)', color: 'var(--color-muted)', margin: '0' }}>
              <span>May 23 - 27</span>
            </h3>
            <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
              A tournament spanning a few days.
            </h2>
          </div>
          <div style={{ margin: 'var(--spacer-32x) 0 var(--spacer-12x)'}}>
            <h3 className={styles.scheduleTitle}>Schedule</h3>
            <p style={{ textAlign: 'center' }}>
              Chozo Item Split
              <br />
              Area Randomied
            </p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
