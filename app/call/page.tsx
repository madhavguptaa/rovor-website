'use client'

import Image from 'next/image'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const partners = [
  {
    id: 1,
    name: 'Aakansha',
    role: 'Lifestyle Host',
    avatar: '/sample/Ellipse 46.svg',
    status: 'Available now',
    languages: 'English, Portuguese',
    rating: '4.9',
  },
  {
    id: 2,
    name: 'Mira',
    role: 'Fitness Coach',
    avatar: '/sample/Ellipse 42.svg',
    status: 'Available in 5 min',
    languages: 'English, Hindi',
    rating: '4.8',
  },
  {
    id: 3,
    name: 'Joy',
    role: 'Gaming Companion',
    avatar: '/sample/Ellipse 30.svg',
    status: 'On a call',
    languages: 'English',
    rating: '4.7',
  },
  {
    id: 4,
    name: 'Nina',
    role: 'Travel Storyteller',
    avatar: '/sample/Ellipse 28.svg',
    status: 'Available now',
    languages: 'English, Spanish',
    rating: '4.9',
  },
]

export default function CallPage() {
  return (
    <div className={styles.screen}>
      <Header activeNav="call" />

      <main className={styles.main}>
        <header className={styles.hero}>
          <div>
            <span className={styles.kicker}>Instant Connections</span>
            <h1 className={styles.title}>Book a voice or video call</h1>
            <p className={styles.subtitle}>
              Browse partners who are ready to talk. Choose voice or video for a deeper session, and keep chat handy for quick
              follow-ups.
            </p>
          </div>
        </header>

        <section className={styles.grid}>
          {partners.map((partner) => (
            <article key={partner.id} className={styles.card}>
              <div className={styles.headerRow}>
                <div className={styles.avatarWrap}>
                  <Image src={partner.avatar} alt={partner.name} width={80} height={80} />
                </div>
                <button type="button" className={styles.chatPill} aria-label={`Message ${partner.name}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 5h8M3 7h5M11.5 6.5c0 2.222-2.1 4-4.5 4-.633 0-1.25-.119-1.812-.342L2.5 11.5 3 9.94C2.62 9.34 2.375 8.655 2.375 7.938 2.375 5.716 4.475 3.938 6.875 3.938S11.5 5.716 11.5 7.938Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Chat
                </button>
              </div>

              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <h2>{partner.name}</h2>
                  <span className={styles.rating}>{partner.rating}</span>
                </div>
                <p className={styles.role}>{partner.role}</p>
                <p className={styles.languages}>{partner.languages}</p>
                <span className={styles.status}>{partner.status}</span>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.actionButton}>
                  Voice Call
                </button>
                <button type="button" className={`${styles.actionButton} ${styles.primaryAction}`}>
                  Video Call
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
