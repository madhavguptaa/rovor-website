'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useMemo, useState } from 'react'
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/max'
import type { CountryCode } from 'libphonenumber-js'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

type TicketFormValues = {
  fullName: string
  email: string
  subject: string
  category: string
  description: string
  countryCode: string
  countryName: string
  phoneNumber: string
}

type TicketFormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; ticketId: string }
  | { status: 'error'; message: string }

const initialValues: TicketFormValues = {
  fullName: '',
  email: '',
  subject: '',
  category: 'account',
  description: '',
  countryCode: '',
  countryName: '',
  phoneNumber: '',
}

const categories = [
  { value: 'account', label: 'Account & Login' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'safety', label: 'Safety & Reporting' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
  { value: 'other', label: 'Other' },
]

type CountryOption = {
  code: CountryCode
  name: string
  dialCode: string
}

export default function SupportPage() {
  const router = useRouter()
  const regionDisplayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' })
    } catch {
      return null
    }
  }, [])
  const countryOptions = useMemo<CountryOption[]>(() => {
    const codes = getCountries()
    const options = codes
      .map((code) => {
        try {
          const name = regionDisplayNames?.of(code) ?? code
          const dialCode = `+${getCountryCallingCode(code)}`
          if (!name || !dialCode) return null
          return { code, name, dialCode }
        } catch {
          return null
        }
      })
      .filter((option): option is CountryOption => option !== null)
      .sort((a, b) => a.name.localeCompare(b.name))

    return options
  }, [regionDisplayNames])

  const [values, setValues] = useState<TicketFormValues>(initialValues)
  const [formState, setFormState] = useState<TicketFormState>({ status: 'idle' })
  const [isBotVisible, setIsBotVisible] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null)
  const [phonePrefix, setPhonePrefix] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [lastRequesterName, setLastRequesterName] = useState('')
  const [chatHref, setChatHref] = useState('/chat')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [lastTicketDetails, setLastTicketDetails] = useState<{
    ticketId: string
    fullName: string
    email: string
    phoneNumber: string
    countryName: string
    category: string
    subject: string
  } | null>(null)

  const isSubmitDisabled = useMemo(() => {
    if (formState.status === 'submitting') return true
    return (
      !values.fullName ||
      !values.email ||
      !values.subject ||
      !selectedCountry ||
      !values.phoneNumber ||
      !isPhoneValid
    )
  }, [formState.status, isPhoneValid, selectedCountry, values.email, values.fullName, values.phoneNumber, values.subject])

  const handleChange =
    (field: 'fullName' | 'email' | 'subject' | 'category' | 'description') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const validatePhoneNumberForCountry = (digits: string, country: CountryOption | null) => {
    if (!country) {
      setPhoneError('Select your country before entering a phone number.')
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    if (!digits) {
      setPhoneError('')
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    const formatted = `${country.dialCode}${digits}`

    const parsed = parsePhoneNumberFromString(formatted, country.code)

    if (!parsed || parsed.country !== country.code) {
      setPhoneError(`Enter a valid phone number for ${country.name}.`)
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    if (!parsed.isPossible()) {
      setPhoneError(`This number length looks off for ${country.name}.`)
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    if (!parsed.isValid()) {
      setPhoneError(`Enter a valid phone number for ${country.name}.`)
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    const type = parsed.getType()
    if (!type || !type.includes('MOBILE')) {
      setPhoneError(`Please provide a mobile number for ${country.name}.`)
      setIsPhoneValid(false)
      return { valid: false } as const
    }

    setPhoneError('')
    setIsPhoneValid(true)

    return {
      valid: true as const,
      e164: parsed.number,
      international: parsed.formatInternational(),
      national: parsed.nationalNumber,
    }
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCode = (event.target.value as CountryCode | '') ?? ''

    if (!nextCode) {
      setSelectedCountry(null)
      setValues((prev) => ({
        ...prev,
        countryCode: '',
        countryName: '',
        phoneNumber: '',
      }))
      setPhonePrefix('')
      setPhoneError('')
      setIsPhoneValid(false)
      return
    }

    const option = countryOptions.find((entry) => entry.code === nextCode) ?? null
    if (!option) {
      setSelectedCountry(null)
      setValues((prev) => ({
        ...prev,
        countryCode: '',
        countryName: '',
        phoneNumber: '',
      }))
      setPhonePrefix('')
      setPhoneError('')
      setIsPhoneValid(false)
      return
    }

    setSelectedCountry(option)
    setValues((prev) => ({
      ...prev,
      countryCode: option.code,
      countryName: option.name,
      phoneNumber: '',
    }))
    setPhonePrefix(option.dialCode)
    setPhoneError('')
    setIsPhoneValid(false)
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')
    setValues((prev) => ({ ...prev, phoneNumber: digits }))
    const result = validatePhoneNumberForCountry(digits, selectedCountry)

    if (result.valid) {
      setValues((prev) => ({ ...prev, phoneNumber: result.national }))
    }
  }

  const handleCloseModal = () => {
    setShowConfirmationModal(false)
  }

  const handleGoHome = () => {
    setShowConfirmationModal(false)
    router.push('/recommended')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) return

    const country = selectedCountry
    const validation = validatePhoneNumberForCountry(values.phoneNumber, country)
    if (!validation.valid || !country) return

    setFormState({ status: 'submitting' })

    try {
      const submissionPayload = {
        ...values,
        phoneNumber: validation.e164,
        countryCode: country.code,
        countryName: country.name,
      }

      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      })

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { error?: string } | null
        const errorMessage = errorPayload?.error ?? 'We were unable to submit your ticket. Please try again.'
        throw new Error(errorMessage)
      }

      const data = (await response.json()) as { ticketId: string }

      setLastTicketDetails({
        ticketId: data.ticketId,
        fullName: values.fullName,
        email: values.email,
        phoneNumber: validation.international,
        countryName: country.name,
        category: values.category,
        subject: values.subject,
      })
      setLastRequesterName(values.fullName)
      setFormState({ status: 'success', ticketId: data.ticketId })
      setValues(initialValues)
      setSelectedCountry(null)
      setPhonePrefix('')
      setPhoneError('')
      setIsPhoneValid(false)
      setChatHref(`/chat?supportTicket=${encodeURIComponent(data.ticketId)}`)
      setIsBotVisible(true)
      setShowConfirmationModal(true)
    } catch (error) {
      setFormState({
        status: 'error',
        message: error instanceof Error ? error.message : 'We were unable to submit your ticket. Please try again.',
      })
    }
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
                <label htmlFor="fullName">
                  Full name <span className={styles.required}>*</span>
                </label>
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

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="country">
                    Country <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={values.countryCode}
                    onChange={handleCountryChange}
                    required
                  >
                    <option value="">Select your country</option>
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="category">
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select id="category" name="category" value={values.category} onChange={handleChange('category')} required>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="phoneNumber">
                  Phone number <span className={styles.required}>*</span>
                </label>
                <div className={styles.phoneField}>
                  <span className={styles.phonePrefix} aria-hidden="true">
                    {phonePrefix || '+--'}
                  </span>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder={selectedCountry ? `Enter ${selectedCountry.name} number` : 'Select country first'}
                    value={values.phoneNumber}
                    onChange={handlePhoneChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={15}
                    disabled={!selectedCountry}
                    aria-describedby="phone-description"
                    aria-invalid={phoneError ? 'true' : 'false'}
                    required
                  />
                </div>
                <p id="phone-description" className={styles.phoneHelp}>
                  Your number is stored with the country prefix ({phonePrefix || 'select a country'}).
                </p>
                {phoneError ? <p className={styles.fieldError}>{phoneError}</p> : null}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="email">
                  Email <span className={styles.required}>*</span>
                </label>
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

              <div className={styles.fieldGroup}>
                <label htmlFor="subject">
                  Subject <span className={styles.required}>*</span>
                </label>
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
                <strong>Ticket created successfully.</strong>
                <span>Your support reference is #{formState.ticketId}. We’ll reach out by email shortly.</span>
                <div className={styles.successActions}>
                  <button
                    type="button"
                    className={styles.chatButton}
                    onClick={() => router.push(chatHref)}
                    aria-label="Open full chat view"
                  >
                    Open chat with support
                  </button>
                  <p className={styles.chatHint}>Open the full chat window for a complete conversation history.</p>
                </div>
              </div>
            ) : null}
            {formState.status === 'error' ? (
              <div className={styles.errorBanner} role="alert">
                <strong>We hit a snag.</strong>
                <span>{formState.message}</span>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      {isBotVisible ? (
        <aside className={styles.botWidget} aria-live="polite">
          <div className={styles.botHeader}>
            <div className={styles.botHeaderText}>
              <span className={styles.botTitle}>Rovor Support Bot</span>
              {formState.status === 'success' ? (
                <span className={styles.botSubtitle}>Tracking ticket #{formState.ticketId}</span>
              ) : (
                <span className={styles.botSubtitle}>We’re here to help</span>
              )}
            </div>
            <button
              type="button"
              className={styles.botClose}
              onClick={() => setIsBotVisible(false)}
              aria-label="Close support bot"
            >
              ×
            </button>
          </div>
          <div className={styles.botBody}>
            <div className={styles.botMessage} data-role="bot">
              Hi {lastRequesterName ? lastRequesterName.trim().split(' ')[0] : 'there'}! I’ve logged your ticket and will keep an
              eye out for an agent. Feel free to leave more details or questions here.
            </div>
            <div className={styles.botMessage} data-role="tip">
              <button type="button" onClick={() => router.push(chatHref)} className={styles.inlineChatButton}>
                View the full chat
              </button>{' '}
              anytime for longer conversations.
            </div>
          </div>
          <div className={styles.botInputRow}>
            <input
              type="text"
              placeholder="Type a quick follow-up…"
              className={styles.botInput}
              aria-label="Message support bot"
            />
            <button type="button" className={styles.botSendButton} aria-label="Send message to support bot">
              Send
            </button>
          </div>
        </aside>
      ) : null}

      {showConfirmationModal && lastTicketDetails ? (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title">
          <div className={styles.modalCard}>
            <header className={styles.modalHeader}>
              <div>
                <p className={styles.modalKicker}>Ticket logged</p>
                <h2 className={styles.modalTitle} id="ticket-modal-title">
                  #{lastTicketDetails.ticketId}
                </h2>
              </div>
              <button type="button" className={styles.modalClose} onClick={handleCloseModal} aria-label="Close ticket summary">
                ×
              </button>
            </header>
            <div className={styles.modalBody}>
              <p className={styles.modalLead}>
                Thanks, {lastTicketDetails.fullName.trim().split(' ')[0] || lastTicketDetails.fullName}. Our team will reach out
                soon. Here’s a quick summary:
              </p>
              <dl className={styles.modalDetails}>
                <div>
                  <dt>Subject</dt>
                  <dd>{lastTicketDetails.subject}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{categories.find((item) => item.value === lastTicketDetails.category)?.label ?? lastTicketDetails.category}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{lastTicketDetails.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{lastTicketDetails.phoneNumber}</dd>
                </div>
                <div>
                  <dt>Country</dt>
                  <dd>{lastTicketDetails.countryName}</dd>
                </div>
              </dl>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.primaryModalButton} onClick={handleGoHome}>
                Take me home
              </button>
              <button type="button" className={styles.secondaryModalButton} onClick={handleCloseModal}>
                Stay on Support
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
