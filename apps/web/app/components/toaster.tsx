'use client'

import { Toaster } from 'sonner'
import styles from './toaster.module.css'

export default function WrappedToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          textAlign: 'center',
          color: 'var(--color-foreground)',
          background: 'rgb(0,0,0,0.8)',
        },
        className: styles.toast,
        descriptionClassName: styles.description,
      }}
    />
  )
}
