'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './header.module.css'
import DiscordLogo from './logos/discord'
import GithubLogo from './logos/github'
import { cn } from '@/lib/utils'

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
}

const LINKS: HeaderLink[] = [
  {
    href: '/generate',
    label: 'Generate',
  },
  {
    href: '/readable',
    label: 'Logic',
  },
  {
    href: '/resources',
    label: 'Resources',
  }
]

export const Navigation = () => {
  const pathname = usePathname()
  return (
    <nav className={styles['navigation']}>
      <ul>
        {LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <li key={link.href}>
              <Link href={link.href} className={cn(isActive && styles.active)}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Logo() {
  return (
    <div className={styles['logo']}>
      <Link href="/">
        DASH
      </Link>
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

export const NewHeader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['container']}>
        <Logo />
        <Navigation />
        <Social />
      </div>
    </div>
  )
}