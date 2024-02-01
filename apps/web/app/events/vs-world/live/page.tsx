import { Wrapper } from '@/app/components/wrapper'
import styles from '../page.module.css'
import { TwitchStream } from './twitch'
import Sidebar from './sidebar'

export const metadata = {
  title: 'Chozo Showcase - DASH',
  description: 'A live showcase of the Chozo logic preset for DASH.',
}

export default function LivePage() {
  return (
    <Wrapper fullWidth={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <TwitchStream />
        </div>
        <Sidebar />
      </div>
    </Wrapper>
  )
}
