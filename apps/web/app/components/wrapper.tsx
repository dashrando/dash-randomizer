import { PropsWithChildren } from 'react'
import { NewHeader } from './header'
import styles from './wrapper.module.css'
import FileDrop from './file-drop'
import Toaster from './toaster'
import CommandMenu from './command'
import { cn } from '@/lib/utils'

export interface WrapperProps extends PropsWithChildren {
  borderless?: boolean
  fullWidth?: boolean
}

export const Wrapper = ({ borderless = false, fullWidth = false, ...props }: WrapperProps) => {
  return (
    <>
      <Toaster />
      <NewHeader borderless={borderless} />
      <main className={cn(styles.container, fullWidth && styles.fullWidth)}>
        {props.children}
      </main>
      <FileDrop />
      <CommandMenu />
    </>
  )
}
