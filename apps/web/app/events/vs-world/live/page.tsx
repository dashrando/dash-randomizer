import { Wrapper } from '@/app/components/wrapper'
import styles from '../page.module.css'
import { TwitchStream } from './twitch'
import Sidebar from './sidebar'

export const metadata = {
  title: 'DASH Team vs The World - Live',
  description: 'A live stream of the DASH Team vs The World event',
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
