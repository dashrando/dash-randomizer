import { CSSProperties } from 'react'
import styles from './spacer.module.css'

export default function Spacer({
  y = 1,
}: {
  y?: number
}) {
  const style = { '--spacing': `var(--spacer-${y}x)` } as CSSProperties
  return <div className={styles.base} style={style} aria-hidden={true} />
}
