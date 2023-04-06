'use client'

import Type from '@/app/components/typography'
import styles from './nav.module.css'
import { cn } from '@/lib/utils'
import { Fragment, useState } from 'react'

const Nav = ({ sections }: { sections: any[] }) => {
  const [open, setOpen] = useState(false)
  return (
    <aside className={cn(styles.wrapper, open && styles.open)}>
      <button
        className={styles.mobile_btn}
        onClick={() => setOpen(!open)}
      >
        {open ? <span style={{ display: 'inline-block', width: '8px', textAlign: 'left' }}>-</span> : <span style={{ display: 'inline-block', width: '8px', textAlign: 'left' }}>+</span>} Table of Contents
      </button>
      <nav className={styles.nav}>
        {sections.map((section: any) => (
          <Fragment key={section.label}>
            <Type size="small" weight="bold" className={styles.title}>
              {section.label}
            </Type>
            <ul>
              {section.items.map((item: any) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setOpen(false)}>{item}</a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </nav>
    </aside>
  )
}

export default Nav
