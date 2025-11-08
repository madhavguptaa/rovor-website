'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.css'

const SAMPLE_EMAIL = 'rovor-sample@example.com'
const SAMPLE_PASSWORD = 'password'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    const isSampleLogin =
      normalizedEmail === SAMPLE_EMAIL && normalizedPassword === SAMPLE_PASSWORD

    if (isSampleLogin) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', SAMPLE_EMAIL)
      router.push('/recommended')
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
        <div className={styles.inputWrapper}>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email Address..."
            className={styles.textInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.inputLabel}>Password</label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={styles.textInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5.05 0-9.31-3.27-10.87-7.82a1 1 0 0 1 0-.72 12.21 12.21 0 0 1 3.2-4.92" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5.05 0 9.31 3.27 10.87 7.82a1 1 0 0 1 0 .72 12.8 12.8 0 0 1-2.85 4.21" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.formOptions}>
        <label className={styles.rememberLabel}>
          <input type="checkbox" className={styles.checkbox} />
          Remember me
        </label>
        <a href="#" className={styles.forgotLink}>Forgot Password?</a>
      </div>

      <button type="submit" className={styles.submitButton}>Login</button>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>or</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.socialRow}>
        <button type="button" className={styles.socialButton}>
          <Image src="/google-login.svg" alt="Google" width={24} height={24} />
        </button>
        <button type="button" className={styles.socialButton}>
          <Image src="/phone-login.svg" alt="Phone" width={24} height={24} />
        </button>
      </div>

      <p className={styles.signupText}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className={styles.signupLink}>Sign up here</Link>
      </p>
    </form>
  )
}
