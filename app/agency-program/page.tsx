'use client'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

export default function AgencyProgramPage() {
  return (
    <div className={styles.screen}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>Rovor Agencies</span>
          <h1>Agency Program</h1>
          <p>
            We&apos;re refining the agency onboarding experience to serve you better. The updated program will return soon with
            refreshed benefits, playbooks, and tooling for Rovor agency partners.
          </p>
          <div className={styles.callout}>Coming soon</div>
        </section>
      </main>
    </div>
  )
}
