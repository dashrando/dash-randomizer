import { Wrapper } from '@/app/components/wrapper'
import styles from '../page.module.css'

export const metadata = {
  title: 'Chozo Showcase - DASH',
  description: 'A live showcase of the Chozo logic preset for DASH.',
}

export default function LivePage() {
  return (
    <Wrapper fullWidth={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.embed}>
            <iframe
              src="https://player.twitch.tv/?channel=speedgaming&parent=localhost"
              height="450"
              width="800"
              allowFullScreen
            />
          </div>
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.schedule}>
            <h1 className={styles.title}>Chozo Showcase</h1>
            <ul className={styles.races}>
              <li className={styles.race}>
                race 1
              </li>
            </ul>
          </div>
          <div className={styles.chatEmbed}>
            <iframe src="https://www.twitch.tv/embed/speedgaming/chat?darkpopout&parent=localhost"
              height="100%"
              width="100%" />
          </div>
          
        </aside>
      </div>
    </Wrapper>
  )
}
