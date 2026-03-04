import { Wrapper } from '@/app/components/wrapper'
import styles from '../../vs-world/event.module.css'
import { ButtonLink } from '@/app/components/button'
import Link from 'next/link'
import Background from '../bg'

export const metadata = {
  title: 'DASH Mystery',
  description: 'A tournament where the settings are discovered as the seed unfolds',
}

export default function TournamentPage() {
  const baseUrl = '/events/mystery-ii'

  return (
    <>
      <div className={styles.mysteryBackground}>
        <div className={styles.aspectRatio}>
        <Background />
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
                  <svg width="408" height="81" viewBox="0 0 408 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>DASH Mystery Vol II</title>
                    <path d="M394.833 79.2881V0.848145H407.553V79.2881H394.833Z" fill="white"/>
                    <path d="M375.323 79.2881V0.848145H388.043V79.2881H375.323Z" fill="white"/>
                    <path d="M334.335 79.2881V0.848145H346.949V68.9001H357.655V79.2881H334.335Z" fill="white"/>
                    <path d="M327.863 15.794V64.342C327.863 74.518 322.033 80.136 312.387 80.136C302.635 80.136 296.805 74.518 296.805 64.342V15.794C296.805 5.618 302.635 0 312.387 0C322.033 0 327.863 5.618 327.863 15.794ZM309.419 65.402C309.419 68.582 310.267 70.49 312.387 70.49C314.401 70.49 315.249 68.582 315.249 65.402V14.734C315.249 11.554 314.401 9.646 312.387 9.646C310.267 9.646 309.419 11.554 309.419 14.734V65.402Z" fill="white"/>
                    <path d="M283.605 79.2881H269.401L260.073 0.848145H273.111L276.079 42.2941L276.715 52.7881H277.033L277.669 42.2941L280.637 0.848145H293.039L283.605 79.2881Z" fill="white"/>
                    <path d="M235.241 52.5761V79.2881H222.733V52.5761L212.875 0.848145H225.488L229.305 30.7401H229.622L233.227 0.848145H245.099L235.241 52.5761Z" fill="white"/>
                    <path d="M197.361 70.5961V50.0321C197.361 46.6401 196.513 44.7321 194.393 44.7321H191.637V79.2881H178.917V0.848145H195.452C204.463 0.848145 209.975 6.14814 209.975 15.6881V29.3621C209.975 33.8141 208.809 37.4181 203.827 39.8561C208.809 42.4001 209.975 46.0041 209.975 50.5621V70.5961C209.975 73.4581 210.399 76.4261 211.565 79.2881H198.844C197.572 76.7441 197.361 73.3521 197.361 70.5961ZM197.361 29.8921V15.6881C197.361 12.1901 196.513 10.2821 194.393 10.2821H191.637V35.1921H194.393C196.513 35.1921 197.361 33.2841 197.361 29.8921Z" fill="white"/>
                    <path d="M148.744 79.2881V0.848145H173.336V11.2361H161.358V34.4501H172.064V44.8381H161.358V68.9001H173.336V79.2881H148.744Z" fill="white"/>
                    <path d="M143.245 11.2361H134.871V79.2881H122.257V11.2361H113.883V0.848145H143.245V11.2361Z" fill="white"/>
                    <path d="M110.191 15.9V30.634H98.4252V14.734C98.4252 11.554 97.5772 9.646 95.5632 9.646C93.5492 9.646 92.8072 11.554 92.8072 14.734V24.38C92.8072 28.726 94.1852 30.21 97.3652 33.284L103.407 38.796C108.601 43.778 110.403 46.958 110.403 54.908V64.236C110.403 74.518 104.573 80.136 95.2452 80.136C85.8112 80.136 80.5112 74.518 80.5112 64.236V49.184H92.3832V65.402C92.3832 68.582 93.2312 70.49 95.2452 70.49C97.2592 70.49 98.0012 68.582 98.0012 65.402V55.226C98.0012 50.88 97.0472 49.926 93.7612 46.958L87.5072 41.34C82.9492 37.1 80.5112 33.39 80.5112 26.076V15.9C80.5112 5.618 86.2352 0 95.6692 0C105.103 0 110.191 5.618 110.191 15.9Z" fill="white"/>
                    <path d="M67.8142 52.5761V79.2881H55.3062V52.5761L45.4482 0.848145H58.0622L61.8782 30.7401H62.1962L65.8002 0.848145H77.6722L67.8142 52.5761Z" fill="white"/>
                    <path d="M24.274 79.2881H15.582L11.766 39.4321L10.812 29.6801H10.6L10.706 39.4321V79.2881H0V0.848145H15.476L19.398 40.9161L20.246 49.7141H20.564L21.306 40.9161L25.228 0.848145H40.598V79.2881H29.256V39.4321L29.362 29.6801H29.044L28.302 39.4321L24.274 79.2881Z" fill="white"/>
                  </svg>
                </Link>
              </div>
              <nav className={styles.mysteryNav}>
                <ul>
                  <li>
                    <Link href={`${baseUrl}/info`}>Info</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`} prefetch={false}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <h2 style={{ margin: 'var(--spacer-16x) auto var(--spacer)', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '440px' }}>
              Thank you for registering.
            </h2>
            <div style={{ margin: 'var(--spacer-8x) 0 var(--spacer-16x)' }}>
              <ButtonLink href="/events/mystery/discord" variant="hero">Join Tournament Discord</ButtonLink>
            </div>
            <p>Please join the tournament Discord where more information will be announced.</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
