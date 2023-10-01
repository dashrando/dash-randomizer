import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'

export default function CanaryInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Canary</h1>
          <p>Canary is the official preview environment for new changes to DASH and available publicly at <a href="https://canary.dashrando.net" target="_blank" rel="noopener noreferrer">canary.dashrando.net</a>. The goal of canary is to provide an early and playable preview of DASH to gather feedback and test new features while also providing reliability for tournaments and competitive racing.</p>
          <p>For example, <a href="/info/settings#area">Area Randomization</a> and <a href="/info/settings#boss">Boss Randomization</a> are two unstable features in an Alpha state. The DASH team are making these two features available on canary for all to test and provide feedback. While these two features are unstable and in canary, a bug fix can be deployed to the main site and logic independently without bringing in these unstable features.</p>
          <p>Because the canary site can feature breaking changes, it will always be marked in the header as &quot;DASH Canary&quot;.</p>
          <p><em>Examples of what goes into canary:</em></p>
          <ul>
            <li>New features (such as area randomization and boss randomization)</li>
            <li>Logic changes</li>
            <li>Any changes that would affect tournaments or races</li>
          </ul>
          <p><em>Examples of what does not go into canary:</em></p>
          <ul>
            <li>Bug fixes</li>
            <li>Documentation</li>
          </ul>
        </article>
      </div>
    </Wrapper>
  )
}
