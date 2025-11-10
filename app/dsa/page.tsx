'use client'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const statementItems = [
  {
    title: 'Notice-and-Action (Articles 16–17)',
    description:
      'Members and authorities can flag allegedly illegal content via in-product reporting tools or by emailing info@rovor.com. Reports are triaged with automated signals and human moderation, and we communicate reasons for enforcement decisions where required.',
  },
  {
    title: 'Trusted Flaggers (Article 22)',
    description:
      'When a Digital Services Coordinator designates trusted flaggers, Rovor will offer dedicated channels and priority handling for their notices.',
  },
  {
    title: 'Repeat Infringers (Article 23)',
    description:
      'We maintain proportionate policies to address accounts that repeatedly disseminate illegal content, balancing safety with due process and applicable law.',
  },
  {
    title: 'Transparency & Reporting (Articles 15 & 24(1))',
    description:
      'Rovor publishes periodic transparency information covering moderation actions, notices received, and the role of automated tools versus human review.',
  },
  {
    title: 'Advertising Transparency (Article 26)',
    description:
      'Ad placements indicate promotional status, identify the advertiser, and provide meaningful insights into targeting parameters.',
  },
  {
    title: 'Recommender Systems (Article 27)',
    description:
      'Where recommender systems are used, we explain key ranking parameters and offer user controls as required by law.',
  },
  {
    title: 'Appeals & Complaints (Articles 20–21)',
    description:
      'Users can appeal select moderation decisions via in-app workflows. Certified out-of-court dispute settlement bodies are available where mandated.',
  },
  {
    title: 'Researcher Access (Article 40)',
    description:
      'Rovor will cooperate with vetted researcher requests that meet DSA criteria, while upholding privacy and security obligations.',
  },
]

export default function DsaStatementPage() {
  return (
    <div className={styles.screen}>
      <Header />

      <main className={styles.main}>
        <section className={styles.headerSection}>
          <span className={styles.kicker}>Digital Services Act</span>
          <h1 className={styles.title}>DSA Statement – Rovor</h1>
          <p className={styles.lastUpdated}>Last updated: November 10, 2025</p>
          <p className={styles.intro}>
            The Digital Services Act (DSA) is a European Union regulation that came fully into force on 17 February 2024. It introduces
            harmonised obligations for platforms that offer services to users in the EU, focused on safety, transparency, and
            accountability. This statement summarises Rovor’s EU user metrics and our compliance posture under the DSA.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Monthly Active Users in the European Union</h2>
          <p>
            Article 24(2) of the DSA requires platforms to publish average monthly active recipients in the EU. Following the European
            Commission’s guidance and Recital 77, Rovor counts unique users who actively engage with our service in the EU during a
            calendar month, removes obviously automated traffic, and aggregates engagement across our distribution channels using
            consistent methodology.
          </p>
          <p>
            For the assessment window from <strong>1 May 2025</strong> through <strong>31 October 2025</strong>, Rovor conducted a detailed review of internal
            logs and analytics. Our results show an average number of EU monthly active users below the <strong>45,000,000</strong> threshold that
            triggers designation as a Very Large Online Platform (VLOP). As of this publication, Rovor has <strong>not</strong> been designated a VLOP.
          </p>
          <div className={styles.noticeCard}>
            <strong>Future designations</strong>
            <p>
              Should the European Commission designate Rovor as a VLOP, we will promptly comply with the additional obligations that apply
              to VLOPs and update this statement without delay.
            </p>
          </div>
          <p>
            Rovor will continue monitoring EU monthly active users and will update this statement at least every six months, or sooner if
            material changes occur, in line with Article 24(2).
          </p>
        </section>

        <section className={styles.section}>
          <h2>Overview of DSA Compliance Measures</h2>
          <div className={styles.grid}>
            {statementItems.map((item) => (
              <article key={item.title} className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Contact Points under the DSA</h2>
          <div className={styles.contactCard}>
            <dl>
              <div>
                <dt>General EU point of contact (Article 11)</dt>
                <dd>
                  <a href="mailto:dsa@rovor.com">dsa@rovor.com</a>
                </dd>
              </div>
              <div>
                <dt>Legal contact for authorities (Article 11)</dt>
                <dd>
                  <a href="mailto:dsa@rovor.com">dsa@rovor.com</a> (English preferred)
                </dd>
              </div>
              <div>
                <dt>User support for reports and appeals</dt>
                <dd>
                  <a href="mailto:info@rovor.com">info@rovor.com</a> or our in-app reporting tools
                </dd>
              </div>
            </dl>
            <p className={styles.contactNote}>
              For broader policy details, refer to our Terms of Use, Privacy Policy, Community Guidelines, and Copyright Policy. Questions
              about this statement or Rovor’s compliance posture can be directed to <a href="mailto:dsa@rovor.com">dsa@rovor.com</a>.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
