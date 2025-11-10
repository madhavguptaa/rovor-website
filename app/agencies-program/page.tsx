'use client'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

export default function AgenciesProgramPage() {
  return (
    <div className={styles.screen}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>Rovor Agencies</span>
          <h1>Agencies Program</h1>
          <p>
            We&apos;re putting final touches on the next version of the Rovor agencies experience. Expect refreshed benefits,
            dashboards, and onboarding flows when we reopen applications.
          </p>
          <div className={styles.callout}>Coming soon</div>
        </section>
      </main>
    </div>
  )
}
