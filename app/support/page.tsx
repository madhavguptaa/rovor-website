'use client'

import { FormEvent, useMemo, useState } from 'react'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

type TicketFormValues = {
  fullName: string
  email: string
  subject: string
  category: string
  priority: string
  description: string
}

type TicketFormState = {
  status: 'idle' | 'submitting' | 'success'
  ticketId?: string
}

const initialValues: TicketFormValues = {
  fullName: '',
  email: '',
  subject: '',
  category: 'account',
  priority: 'normal',
  description: '',
}

const categories = [
  { value: 'account', label: 'Account & Login' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'safety', label: 'Safety & Reporting' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
]

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export default function SupportPage() {
  const [values, setValues] = useState<TicketFormValues>(initialValues)
  const [formState, setFormState] = useState<TicketFormState>({ status: 'idle' })

  const isSubmitDisabled = useMemo(() => {
    if (formState.status === 'submitting') return true
    return !values.fullName || !values.email || !values.subject || !values.description
  }, [formState.status, values])

  const handleChange = (field: keyof TicketFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) return

    setFormState({ status: 'submitting' })

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const pseudoTicketId = `RV-${Math.floor(100000 + Math.random() * 900000)}`
    setFormState({ status: 'success', ticketId: pseudoTicketId })
    setValues(initialValues)
  }

  return (
    <div className={styles.screen}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Customer Support</span>
            <h1 className={styles.title}>Raise a support ticket</h1>
            <p className={styles.subtitle}>
              Share the details of your issue and the Rovor support team will get back to you via email. We typically respond
              within 24 hours for standard tickets and faster for urgent cases.
            </p>
          </div>
          <div className={styles.heroNote}>
            <strong>Need immediate help?</strong>
            <span>Email <a href="mailto:info@rovor.com">info@rovor.com</a> or use the in-app help menu for live assistance.</span>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChange={handleChange('fullName')}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@rovor.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  required
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={values.category} onChange={handleChange('category')}>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="priority">Priority</label>
                  <select id="priority" name="priority" value={values.priority} onChange={handleChange('priority')}>
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Give your request a short title"
                  value={values.subject}
                  onChange={handleChange('subject')}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="description">Describe your request</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Share as much detail as possible so we can assist quickly."
                  rows={6}
                  value={values.description}
                  onChange={handleChange('description')}
                  required
                />
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.submitButton} disabled={isSubmitDisabled}>
                  {formState.status === 'submitting' ? 'Submitting...' : 'Submit ticket'}
                </button>
                <p className={styles.helpCopy}>For urgent matters, email <a href="mailto:info@rovor.com">info@rovor.com</a>.</p>
              </div>
            </form>

            {formState.status === 'success' ? (
              <div className={styles.successBanner} role="status">
                <strong>Ticket received!</strong>
                <span>
                  Reference ID {formState.ticketId}. Our support team will get back to you shortly at the email address you provided.
                </span>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
