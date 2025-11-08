'use client'

import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const profile = {
  name: 'Aakansha',
  handle: '@aakansha.live',
  location: 'Lisbon, Portugal',
  joinYear: 2021,
  bio: 'Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.',
  hobbies: ['Travel', 'Workaholic', 'Writer', 'Artist'],
  interests: 'Travel, storytelling, community building',
  languages: ['English', 'Portuguese'],
  occupation: 'Content Creator & Host',
  education: "BA in Communication Design",
  favoriteDestinations: ['Lisbon', 'Bali', 'Cape Town'],
  avatar: '/sample/Ellipse 46.svg',
  following: '10K',
}

export default function UserProfilePage() {
  const quickFacts = [
    { label: 'Following', value: profile.following },
    { label: 'Location', value: profile.location },
    { label: 'Joined', value: `Since ${profile.joinYear}` },
  ]

  const detailFacts = [
    { label: 'Interests', value: profile.interests },
    { label: 'Languages', value: profile.languages.join(', ') },
    { label: 'Occupation', value: profile.occupation },
    { label: 'Education', value: profile.education },
    { label: 'Favourite Destinations', value: profile.favoriteDestinations.join(', ') },
    { label: 'Hobbies', value: profile.hobbies.join(', ') },
  ]

  return (
    <div className={styles.screen}>
      <Header />

      <main className={styles.main}>
        <div className={styles.topBar}>
          <Link href="/recommended" className={styles.backButton} aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M13.75 17.875L7.625 11.75L13.75 5.625" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <section className={styles.profileCard}>
          <button type="button" className={styles.shareButton} aria-label="Share profile">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 7.5C16.3807 7.5 17.5 6.38071 17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M15 17.5C16.3807 17.5 17.5 16.3807 17.5 15C17.5 13.6193 16.3807 12.5 15 12.5C13.6193 12.5 12.5 13.6193 12.5 15C12.5 16.3807 13.6193 17.5 15 17.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 9L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M7 11L13 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.profileHero}>
            <div className={styles.avatarWrap}>
              <Image src={profile.avatar} alt={profile.name} width={160} height={160} />
            </div>
            <div className={styles.identity}>
              <h1 className={styles.profileName}>{profile.name}</h1>
              <span className={styles.usernameHighlight}>{profile.handle}</span>
              <ul className={styles.quickFacts}>
                {quickFacts.map((fact) => (
                  <li key={fact.label} className={styles.quickFact}>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <span className={styles.factValue}>{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.profileAbout}>
            <h2 className={styles.sectionHeading}>About</h2>
            <p className={styles.bio}>{profile.bio}</p>
          </div>

          <section className={styles.detailsWrap}>
            <h2 className={styles.sectionHeading}>Snapshot</h2>
            <dl className={styles.detailList}>
              {detailFacts.map((fact) => (
                <div key={fact.label} className={styles.detailItem}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </main>
    </div>
  )
}
