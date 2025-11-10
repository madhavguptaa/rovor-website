'use client'

import { useState } from 'react'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const helpSections = [
  {
    title: 'Privacy & Confidentiality',
    faqs: [
      {
        question: 'Are my conversations recorded or saved?',
        answer: 'No. Rovor does not record, store, or archive your live calls or chats. Once a session ends, the content leaves our platform.'
      },
      {
        question: 'Can anyone else listen to my calls?',
        answer: 'Calls are encrypted end-to-end. Only you and the partner you connect with are part of the session—no supervisors or silent listeners.'
      },
      {
        question: 'Is my personal information shared with anyone?',
        answer: 'Your profile details stay private. Partners only see the information you choose to share in your profile or during the session.'
      },
      {
        question: 'How is my data stored and protected?',
        answer: 'We use secure cloud infrastructure, regular audits, and strict access controls so your account data remains safe.'
      },
    ],
  },
  {
    title: 'Account & Identity Verification',
    faqs: [
      {
        question: 'How does Rovor verify user identities?',
        answer: 'We use a combination of document checks, selfie verification, and back-office review to keep the community trustworthy.'
      },
      {
        question: 'Why do I need to upload an ID or selfie?',
        answer: 'Verification protects both users and partners. It reduces impersonation and helps us respond quickly to safety concerns.'
      },
      {
        question: 'What happens if someone uses fake info?',
        answer: 'Accounts flagged for false or misleading information are suspended and investigated. Repeat offenses lead to a permanent ban.'
      },
      {
        question: 'Can I use Rovor without verification?',
        answer: 'You can browse experiences, but live interactions, bookings, and earnings require a verified profile.'
      },
    ],
  },
  {
    title: 'Blocking, Reporting & User Safety',
    faqs: [
      {
        question: 'How can I block someone after a call?',
        answer: 'Open your recent sessions, tap the user menu, and select “Block.” They will no longer be able to message or call you.'
      },
      {
        question: 'What happens when I report a user?',
        answer: 'Our safety team reviews the report within 24 hours. If a policy violation is confirmed, we take immediate action, up to account removal.'
      },
    ],
  },
  {
    title: 'Abuse & Harassment Policy',
    faqs: [
      {
        question: 'What type of behavior is not allowed on Rovor?',
        answer: 'Harassment, hate speech, sexual solicitation, spam, and any illegal activity violate our policies and lead to removal.'
      },
    ],
  },
  {
    title: 'Payments & Earnings',
    faqs: [
      {
        question: 'How do I earn money on Rovor?',
        answer: 'Partners earn from live calls, chats, and subscriptions. You set your rate and keep the majority of every transaction.'
      },
      {
        question: 'When do I receive my payments?',
        answer: 'Payouts are processed weekly to your linked bank account or preferred payment provider.'
      },
      {
        question: 'How can I track my earnings?',
        answer: 'Visit the Earnings dashboard to see session history, payouts, and detailed analytics on your performance.'
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className={styles.container}>
      <Header className={styles.headerOverride} />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.pageTitle}>Help & FAQ</h1>
          <p className={styles.pageIntro}>
            Answers to our most common questions about privacy, safety, verification, and getting paid on Rovor.
          </p>
        </section>

        <section className={styles.sectionsWrap}>
          {helpSections.map((section) => (
            <FaqSection key={section.title} title={section.title} faqs={section.faqs} />
          ))}
        </section>
      </main>
    </div>
  )
}

function FaqSection({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <article key={faq.question} className={`${styles.faqCard} ${isOpen ? styles.faqOpen : ''}`}>
              <button
                type="button"
                className={styles.faqTrigger}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span>{faq.question}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
