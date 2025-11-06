import styles from './page.module.css'
import SignupForm from './signup-form'

export default function Signup() {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.signupContainer}>
            <h1 className={styles.signupTitle}>Create Account</h1>
            <p className={styles.signupSubtitle}>Sign up to join Rovor</p>
            
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  )
}

