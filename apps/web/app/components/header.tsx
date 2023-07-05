import Link from 'next/link'
import styles from './header.module.css'

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

export const Navigation = () => (
  <nav className={styles['navigation']}>
    <ul>
      <li>
        <Link href="/generate">Generate</Link>
      </li>
      <li>
        <Link href="/logic">Logic</Link>
      </li>
      <li>
        <Link href="/changelog">Changelog</Link>
      </li>
      <li>
        <Link href="/resources">Resources</Link>
      </li>
    </ul>
  </nav>
)

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

    </div>
  )
}

export const NewHeader = () => {
  return (
    <div className={styles['container']}>
      <Logo />
      <Navigation />
      <Social />
    </div>
  )
}