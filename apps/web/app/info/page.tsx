import Badge from '../components/badge'
import Link from 'next/link'
import { Wrapper } from '../components/wrapper'
import styles from './info.module.css'
import Spacer from '../components/spacer'

export default function InfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ul>
          <li>
            <Link href="/info/settings">Settings</Link>
          </li>
          <li>
            <Link href="/info/verified-fill">Verified Fill</Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
