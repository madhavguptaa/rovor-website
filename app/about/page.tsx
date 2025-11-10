'use client'

import Link from 'next/link'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const pillars = [
  {
    title: 'Trusted Partners',
    copy: 'We work closely with vetted partners across entertainment, learning, wellness, and mentorship so every session feels safe, personal, and meaningful.'
  },
  {
    title: 'Real-time Experiences',
    copy: 'Enjoy live calls, chats, and broadcasts powered by the same UI patterns you use across Rovor pages. Every interaction is designed to feel intuitive and familiar.'
  },
  {
    title: 'Global Community',
    copy: 'Rovor connects you with creators, coaches, and companions from around the world, making distance disappear with every live session.'
  }
]

const onboardingSteps = [
  {
    title: '01. Apply to Partner',
    detail: 'Tell us about your content or service focus. We’ll review your application to ensure a great fit for the Rovor community.'
  },
  {
    title: '02. Curate Your Profile',
    detail: 'Work with our onboarding team to shape your live sessions, chats, and profile highlights so users know exactly what to expect.'
  },
  {
    title: '03. Go Live with Rovor',
    detail: 'Launch your first experiences with marketing support, live tooling, and analytics to help you grow your audience.'
  }
]

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Rovor</h1>
            <p className={styles.heroSubtitle}>
              Rovor connects real people with real partners—coaches, entertainers, mentors, and creators who are live right now. Our platform makes it effortless to discover and interact with sessions tailored to you.
            </p>
            <div className={styles.heroActions}>
              <Link href="/live" className={styles.primaryAction}>
                Explore Live Experiences
              </Link>
              <Link href="#onboard" className={styles.secondaryAction}>
                Become a Partner
              </Link>
            </div>
          </div>
          <div className={styles.heroCard}>
            <h2>Why partners choose Rovor</h2>
            <p>Rovor handles the logistics so you can focus on delivering unforgettable sessions.</p>
            <ul>
              <li>Global reach with curated discovery</li>
              <li>Built-in chat, call, and live tooling</li>
              <li>Dedicated customer support and analytics</li>
            </ul>
          </div>
        </section>

        <section className={styles.pillarsSection}>
          {pillars.map((pillar) => (
            <article key={pillar.title} className={styles.pillarCard}>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </section>

        <section className={styles.connectSection}>
          <div className={styles.connectContent}>
            <h2>How we connect users with partners</h2>
            <p>
              From the first tap, users are guided to partners who match their needs. Whether it’s a live coaching call, a group hangout, or an ongoing mentorship program, Rovor provides seamless scheduling, messaging, and payments. That means you can focus on delivering value while we manage the infrastructure behind every session.
            </p>
            <p>
              Our recommendation engine shows partners across the Live, Call, and Chat surfaces. Users preview your style, hop into trial sessions, and stay engaged with reminders and highlights.
            </p>
          </div>
          <div className={styles.connectSidebar}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>400k+</span>
              <span className={styles.statLabel}>Sessions Hosted</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>85%</span>
              <span className={styles.statLabel}>Partner Retention</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>50+</span>
              <span className={styles.statLabel}>Countries Connected</span>
            </div>
          </div>
        </section>

        <section id="onboard" className={styles.onboardSection}>
          <h2 className={styles.onboardTitle}>Get onboarded in three steps</h2>
          <div className={styles.stepsGrid}>
            {onboardingSteps.map((step) => (
              <div key={step.title} className={styles.stepCard}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
          <Link href="/support" className={styles.ctaButton}>
            Chat with our Partner Team
          </Link>
        </section>
      </main>
    </div>
  )
}
