import React from 'react'
import Nav from './nav'
import Modes from 'core/modes'
import styles from './layout.module.css'

export default async function LogicLayout({
  params,
  children,
}: {
  children: React.ReactNode
  params: any
}) {
  const modes:any = await Modes()
  // const modeKey = params.logic
  // const mode:any = modes[modeKey]
  const mode = modes.recall
  const checks = Object.keys(mode.checks) as string[]
  const sections = [
    {
      label: 'Logical Checks',
      items: checks,
    },
    {
      label: 'Item Locations',
      items: [],
    }
  ]
  return (
    <div className={styles.layout}>
      <Nav sections={sections} />
      {children}
    </div>
  )
}