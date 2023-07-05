import { PropsWithChildren } from 'react'
import { NewHeader } from './header'
import styles from './layout.module.css'

export const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      <NewHeader />
      <main className={styles.container}>
        {props.children}
      </main>
    </div>
  )
}
