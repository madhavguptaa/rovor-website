'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    // Sample user credentials (for testing)
    const sampleEmail = 'Rovor-sample'
    const samplePassword = 'password'

    // If using sample credentials, allow signup
    if (email === sampleEmail && password === samplePassword) {
      // Store user data (simple localStorage for now)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      
      // Redirect to recommended page
      router.push('/recommended')
    } else {
      // For other emails, also allow signup (normal flow)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      
      // Redirect to recommended page
      router.push('/recommended')
    }
  }

  const fillSampleCredentials = () => {
    setEmail('Rovor-sample')
    setPassword('password')
    setConfirmPassword('password')
  }

  return (
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Create a password" 
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          placeholder="Confirm your password" 
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className={styles.formOptions}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} required />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>
      </div>

      <button type="submit" className={styles.signupButton}>
        <span>Sign Up</span>
        <span className={styles.arrowIcon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerText}>or</span>
        <div className={styles.dividerLine}></div>
      </div>

      <div className={styles.socialLogin}>
        <button type="button" className={styles.socialButton}>
          <Image src="/google-login.svg" alt="Google login" width={24} height={24} />
          <span>Continue with Google</span>
        </button>
        <button type="button" className={styles.socialButton}>
          <Image src="/phone-login.svg" alt="Phone login" width={24} height={24} />
          <span>Continue with Phone</span>
        </button>
      </div>

      <p className={styles.loginText}>
        Already have an account? <Link href="/login" className={styles.loginLink}>Sign in</Link>
      </p>

      <div className={styles.sampleCredentials}>
        <p className={styles.sampleText}>Sample credentials for testing:</p>
        <button 
          type="button" 
          onClick={fillSampleCredentials}
          className={styles.sampleButton}
        >
          Use: Rovor-sample / password
        </button>
      </div>
    </form>
  )
}

