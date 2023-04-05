import React from 'react'
import Nav from './nav'

export default function LogicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      {/* @ts-expect-error Async Server Components */}
      <Nav modeKey="recall" />
      {children}
    </div>
  )
}