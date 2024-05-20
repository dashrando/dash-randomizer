import { Wrapper } from '@/app/components/wrapper'
import styles from '../vs-world/event.module.css'
import { ButtonLink } from '@/app/components/button'
import Link from 'next/link'

export const metadata = {
  title: 'DASH Mystery',
  description: 'A tournament where the settings are discovered as the seed unfolds',
}

export default function TournamentPage() {
  const baseUrl = '/events/mystery'

  return (
    <>
      <div className={styles.mysteryBackground}>
        <div className={styles.aspectRatio}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mystery-bg.png" alt="DASH Mystery" loading="eager" />
        </div>
      </div>
      <div className={styles.mysteryMobileNavBg} />
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '64px', lineHeight: '64px', margin: '0', visibility: 'hidden' }}>
                Mystery
              </h1>
              <div className={styles.mysteryLogo}>
                <Link href={`${baseUrl}`}>
                  <svg width="247" height="81" viewBox="0 0 247 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.204 80H16.512L12.696 40.144L11.742 30.392H11.53L11.636 40.144V80H0.930007V1.56H16.406L20.328 41.628L21.176 50.426H21.494L22.236 41.628L26.158 1.56H41.528V80H30.186V40.144L30.292 30.392H29.974L29.232 40.144L25.204 80ZM68.7443 53.288V80H56.2363V53.288L46.3783 1.56H58.9923L62.8083 31.452H63.1263L66.7303 1.56H78.6023L68.7443 53.288ZM111.121 16.612V31.346H99.3552V15.446C99.3552 12.266 98.5072 10.358 96.4932 10.358C94.4792 10.358 93.7372 12.266 93.7372 15.446V25.092C93.7372 29.438 95.1152 30.922 98.2952 33.996L104.337 39.508C109.531 44.49 111.333 47.67 111.333 55.62V64.948C111.333 75.23 105.503 80.848 96.1752 80.848C86.7412 80.848 81.4412 75.23 81.4412 64.948V49.896H93.3132V66.114C93.3132 69.294 94.1612 71.202 96.1752 71.202C98.1892 71.202 98.9312 69.294 98.9312 66.114V55.938C98.9312 51.592 97.9772 50.638 94.6912 47.67L88.4372 42.052C83.8792 37.812 81.4412 34.102 81.4412 26.788V16.612C81.4412 6.32999 87.1652 0.711997 96.5992 0.711997C106.033 0.711997 111.121 6.32999 111.121 16.612ZM144.175 11.948H135.801V80H123.187V11.948H114.813V1.56H144.175V11.948ZM149.674 80V1.56H174.266V11.948H162.288V35.162H172.994V45.55H162.288V69.612H174.266V80H149.674ZM198.29 71.308V50.744C198.29 47.352 197.442 45.444 195.322 45.444H192.566V80H179.846V1.56H196.382C205.392 1.56 210.904 6.85999 210.904 16.4V30.074C210.904 34.526 209.738 38.13 204.756 40.568C209.738 43.112 210.904 46.716 210.904 51.274V71.308C210.904 74.17 211.328 77.138 212.494 80H199.774C198.502 77.456 198.29 74.064 198.29 71.308ZM198.29 30.604V16.4C198.29 12.902 197.442 10.994 195.322 10.994H192.566V35.904H195.322C197.442 35.904 198.29 33.996 198.29 30.604ZM236.17 53.288V80H223.662V53.288L213.804 1.56H226.418L230.234 31.452H230.552L234.156 1.56H246.028L236.17 53.288Z" fill="white"/>
                  </svg>
                </Link>
              </div>
              <nav className={styles.mysteryNav}>
                <ul>
                  <li>
                    <Link href={`${baseUrl}/info`}>Info</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/register`}>Register</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <h2 style={{ margin: 'var(--spacer-16x) auto var(--spacer)', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '440px' }}>
              A tournament where the settings are discovered as the seed unfolds
            </h2>
            <h3 style={{ fontWeight: '400', fontSize: '16px', lineHeight: '32px', display: 'block', color: 'var(--color-highlight)', margin: '0' }}>
              <span>Starts on June 12</span>
            </h3>
          </div>
          <div style={{ margin: 'var(--spacer-12x) 0 var(--spacer-12x)', textAlign: 'center' }}>
            <ButtonLink variant="hero" size="large" href="/events/mystery/register" style={{ margin: '0 auto' }} target="_blank">Register</ButtonLink>
          </div>
          <div style={{ margin: 'var(--spacer-24x) 0 var(--spacer-12x)'}}>
            <h4 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', fontWeight: '400', textAlign: 'center', maxWidth: '480px', color: '#999' }}>
              <span style={{ fontWeight: '600', color: 'var(--color-highlight)' }}>MYSTERY</span> is a community tournament.
            </h4>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
