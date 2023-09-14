import { PropsWithChildren } from 'react'
import { NewHeader } from './header'
import styles from './wrapper.module.css'
import FileDrop from './file-drop'
import Toaster from './toaster'
import CommandMenu from './command'

export interface WrapperProps extends PropsWithChildren {
  borderless?: boolean
}

export const Wrapper = ({ borderless = false, ...props }: WrapperProps) => {
  return (
    <>
      <Toaster />
      <NewHeader borderless={borderless} />
      <main className={styles.container}>
        {props.children}
      </main>
      <FileDrop />
      <CommandMenu />
    </>
  )
}
