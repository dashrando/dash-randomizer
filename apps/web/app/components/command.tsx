'use client'

import { Command } from 'cmdk'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { del } from 'idb-keyval'
import { useVanilla } from '../generate/vanilla'
import { toast } from 'sonner'
import styles from './command.module.css'
// import LoadoutChecks from '@/app/readable/[graph]/loadout'

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const containerElement = useRef(null)
  const router = useRouter()
  const { data: vanilla, refresh } = useVanilla()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const pages = [
    { name: 'Generate', href: '/generate' },
    { name: 'Info', href: '/info' },
    { name: 'Logic', href: '/readable/standard' },
    { name: 'Resources', href: '/resources' },
  ]

  return (
    <>
      {containerElement.current && (
        <Command.Dialog
          container={containerElement.current}
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
        >
          <Command.Input placeholder="Enter a command" />
          <hr />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Pages">
              {pages.map((page) => (
                <Command.Item
                  key={page.href}
                  onSelect={(_) => {
                    router.push(page.href)
                    setOpen(false)
                  }}
                >
                  {page.name}
                </Command.Item>
              ))}
            </Command.Group>
            {/* <Command.Group heading="Logic">
              {LoadoutChecks.map((check, index) => (
                <Command.Item
                  key={index}
                  onSelect={(_) => {
                    router.push(`/readable/standard-area#${check.name}`)
                    setOpen(false)
                  }}
                >
                  {check.name}
                </Command.Item>
              ))}
            </Command.Group> */}
            {vanilla && (
              <Command.Group heading="Misc">
                <Command.Item onSelect={async (_) => {
                  await del('vanilla-rom')
                  toast('Vanilla ROM unset')
                  refresh(null, {
                    revalidate: true,
                  })
                  setOpen(false)
                }}>
                  Unset Vanilla ROM
                </Command.Item>
              </Command.Group>
            )}
          </Command.List>
        </Command.Dialog>
      )}
      <div className={styles.cmd} ref={containerElement} />
    </>
  )

}