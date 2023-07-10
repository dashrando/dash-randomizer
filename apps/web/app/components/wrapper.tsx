import { PropsWithChildren } from 'react'
import { NewHeader } from './header'
import styles from './wrapper.module.css'

export const Wrapper = (props: PropsWithChildren) => {
  return (
    <>
      <NewHeader />
      <main className={styles.container}>
        {props.children}
      </main>
    </>
  )
}
