import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'

export default function AboutInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>About DASH</h1>
          <p><em>Coming Soon</em></p>
        </article>
      </div>
    </Wrapper>
  )
}
