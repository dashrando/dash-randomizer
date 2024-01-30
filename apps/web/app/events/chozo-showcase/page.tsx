import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import Time from './time'
import styles from './info.module.css'

export default function TournamentPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '48px', margin: '0' }}>Chozo Showcase</h1>
          <h3 style={{ textTransform: 'uppercase', fontWeight: '400', fontSize: '20px', display: 'flex', justifyContent: 'center', gap: 'var(--spacer-4x)', color: 'var(--color-muted)', margin: '0' }}>
            <span><Time unit="date" /></span>
            <span><Time unit="time" /></span>
          </h3>
          <h2 style={{ margin: 'var(--spacer-8x) auto', fontSize: '24px', lineHeight: '32px', color: 'var(--color-highlight)', fontWeight: '400', textAlign: 'center', maxWidth: '340px' }}>
            3 races to showcase new DASH capabilities including Multiworld, Chozo and more.
          </h2>
        </div>
      </div>
    </Wrapper>
  )
}
