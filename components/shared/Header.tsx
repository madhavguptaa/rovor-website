'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.css'

type HeaderNavKey = 'live' | 'call' | 'chat'

type HeaderProps = {
  activeNav?: HeaderNavKey
  className?: string
}

const navItems: Array<{
  key: HeaderNavKey
  label: string
  icon: string
  href: string
}> = [
  { key: 'live', label: 'Live', icon: '/live.svg', href: '#' },
  { key: 'call', label: 'Call', icon: '/call.svg', href: '#' },
  { key: 'chat', label: 'Chat', icon: '/Group 1.svg', href: '/chat' },
]

const serviceInfoLinks = [
  { href: '/profile/user', label: 'Profile' },
  { href: '/liked-profiles', label: 'Liked Profiles' },
  { href: '/about', label: 'About' },
  { href: '/agencies-program', label: "Rovor's Agencies Program" },
  { href: '/resellers-program', label: "Rovor's Resellers Program" },
  { href: '/support', label: 'Help Center' },
  { href: '/legal', label: 'Legal Information' },
]

const supportLinks = [
  { href: '/support', label: 'Customer Support' },
  { href: '/app', label: 'Get Rovor App' },
]

export default function Header({ activeNav, className }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const headerClassName = [styles.header, className].filter(Boolean).join(' ')

  return (
    <header className={headerClassName}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink} aria-label="Rovor home">
          <Image src="/rovor-logo.svg" alt="Rovor logo" width={42} height={42} priority />
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeNav === item.key
            const navClass = [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')

            if (item.href === '#') {
              return (
                <span key={item.key} className={navClass}>
                  <Image src={item.icon} alt={item.label} width={18} height={18} className={styles.navIcon} />
                  {item.label}
                </span>
              )
            }

            return (
              <Link key={item.key} href={item.href} className={navClass}>
                <Image src={item.icon} alt={item.label} width={18} height={18} className={styles.navIcon} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.headerRight}>
          <div className={styles.profileWrapper} ref={profileMenuRef}>
            <button
              type="button"
              className={styles.profileButton}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <Image src="/sample/Ellipse 46.svg" alt="Profile" width={44} height={44} />
            </button>

            {menuOpen ? (
              <div className={styles.profileMenu} role="menu">
                <p className={styles.menuHeading}>Service Info</p>
                {serviceInfoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.menuItem}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className={styles.menuDivider} />
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.menuItem}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className={styles.menuDivider} />
                <p className={styles.menuMessage}>Stay connected with your friends anywhere and anytime!</p>
                <div className={styles.menuDivider} />
                <Link href="/login" className={styles.menuItemLogout} role="menuitem" onClick={() => setMenuOpen(false)}>
                  Logout
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
