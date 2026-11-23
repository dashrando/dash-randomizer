import { Wrapper } from '@/app/components/wrapper'
import styles from '../vs-world/event.module.css'
import { ButtonLink } from '@/app/components/button'
import Link from 'next/link'

export const metadata = {
  title: 'DASH SGL26',
  description: 'In-person DASH tournament Oct 22-25',
}

export default function TournamentPage() {
  const baseUrl = '/events/sgl26'

  return (
    <>
      <div className={styles.mysteryMobileNavBg} />
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <h1 style={{ color: '#fff', fontWeight: '600', fontSize: '64px', lineHeight: '64px', margin: '0' }}>
                SGL26
              </h1>
              <nav className={styles.mysteryNav}>
                <ul>
                  <li>
                    <Link href={`${baseUrl}/info`}>Info</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/register`} prefetch={false}>Register</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`} prefetch={false}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`} prefetch={false}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <h2 style={{ margin: 'var(--spacer-16x) auto var(--spacer-8x)', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '440px' }}>
              In-person DASH tournament<br />
              at SpeedGamingLive 2026
            </h2>
            <h3 style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px', display: 'block', color: 'var(--color-highlight)', margin: '0' }}>
              <span>Oct 22nd - Oct 25th</span><br />
              <span>Herndon, VA</span>
            </h3>
          </div>
          <div style={{ margin: 'var(--spacer-12x) auto var(--spacer-12x)', textAlign: 'center', maxWidth: '360px' }}>
            <ButtonLink variant="hero" size="large" href="/generate/sgl26" style={{ margin: '0 auto', display: 'block' }} target="_blank">Generate a Seed</ButtonLink>
            <ButtonLink variant="hero" size="large" href="/events/sgl26/info" style={{ margin: 'var(--spacer-2x) auto 0', display: 'block', backgroundColor: 'transparent', color: 'white', borderWidth: '1px' }}>Learn More</ButtonLink>
          </div>
          <div style={{ margin: 'var(--spacer-12x) 0 var(--spacer-12x)', textAlign: 'center' }}>
          </div>
          {/* <div style={{ margin: 'var(--spacer-24x) 0 var(--spacer-12x)'}}>
            <h4 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', fontWeight: '400', textAlign: 'center', maxWidth: '480px', color: '#999' }}>
              Is it area or not? Major/minor? Chozo? Full countdown? No one will know until the seed is played, as players will be tasked with figuring out the settings as they play.
            </h4>
          </div> */}
        </div>
      </Wrapper>
    </>
  )
}
