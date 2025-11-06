'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Sample user credentials
    const sampleEmail = 'rovor-sample'
    const samplePassword = 'password'

    // Check credentials
    if (email === sampleEmail && password === samplePassword) {
      // Store authentication (simple localStorage for now)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      
      // Redirect to recommended page
      router.push('/recommended')
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  const fillSampleCredentials = () => {
    setEmail('rovor-sample')
    setPassword('password')
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="text" 
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
          placeholder="Enter your password" 
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles.formOptions}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} />
          <span>Remember me</span>
        </label>
        <a href="#" className={styles.forgotLink}>Forgot password?</a>
      </div>

      <button type="submit" className={styles.loginButton}>
        <span>Sign In</span>
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

      <p className={styles.signupText}>
        Don&apos;t have an account? <Link href="/signup" className={styles.signupLink}>Sign up</Link>
      </p>

      <div className={styles.sampleCredentials}>
        <p className={styles.sampleText}>Sample credentials for testing:</p>
        <button 
          type="button" 
          onClick={fillSampleCredentials}
          className={styles.sampleButton}
        >
          Use: rovor-sample / password
        </button>
      </div>
    </form>
  )
}

