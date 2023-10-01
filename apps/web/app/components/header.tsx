'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './header.module.css'
import DiscordLogo from './logos/discord'
import GithubLogo from './logos/github'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import getEnv from '@/lib/env'

const env = getEnv()

export default function Header() {
  return (
    <div id="header">
      <Link href="/">
        <img
          src="/images/dashLogo-noBG.png"
          alt="Super Metroid DASH Randomizer"
        />
      </Link>
    </div>
  );
}

export type HeaderLink = {
  href: string
  label: string
  mobileOnly?: boolean
}

const LINKS: HeaderLink[] = [
  {
    href: '/generate',
    label: 'Generate',
  },
  {
    href: '/info',
    label: 'Info',
  },
  {
    href: '/readable',
    label: 'Logic',
  },
  {
    href: '/resources',
    label: 'Resources',
  },
  {
    href: '/discord',
    label: 'Discord',
    mobileOnly: true,
  },
  {
    href: '/github',
    label: 'Github',
    mobileOnly: true,
  },
]

export const Navigation = () => {
  const pathname = usePathname()
  return (
    <nav className={styles['navigation']}>
      <ul>
        {LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <li key={link.href} className={cn(link.mobileOnly && styles.mobileOnly)}>
              {link.mobileOnly ? (
                <a href={link.href} target="_blank" rel="noopenner noreferrer">{link.label}</a>
              ) : (
                <Link href={link.href} className={cn(isActive && styles.active)}>
                {link.label}
              </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function EnvironmentLabel() {
  const { vercelEnv, branch } = env
  const isPreview = vercelEnv === 'preview'
  const isCanary = branch === 'canary'
  const label = isCanary ? 'canary' : 'preview'

  if (isPreview) {
    return (
      <span className={cn(styles['environment-label'], isCanary ? styles.canary : styles.preview)}>
        {label}
      </span>
    )
  }
  return null
}

function Logo() {
  return (
    <div className={styles['logo']}>
      <Link href="/">
        DASH
      </Link>
      <EnvironmentLabel />
    </div>
  )
}

function Social() {
  return (
    <div className={styles['social']}>
      <a href="/discord" target="_blank" rel="noopenner noreferrer" className={styles.link}>
        <DiscordLogo />
      </a>
      <a href="/github" target="_blank" rel="noopenner noreferrer" className={styles.link}>
        <GithubLogo />
      </a>
    </div>
  )
}

export const NewHeader = ({ borderless = false }: { borderless?: boolean }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  return (
    <div className={cn(styles.wrapper, menuOpen && styles.open, borderless && styles.borderless)}>
      <div className={styles['container']}>
        <Logo />
        <Navigation />
        <Social />
        <button
          className={styles.mobileNavBtn}
          onClick={(evt) => {
            evt.preventDefault()
            setMenuOpen(!menuOpen)
          }}
        >
          <div className={styles.mobileNavInner} />
        </button>
      </div>
    </div>
  )
}