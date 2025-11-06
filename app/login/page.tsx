import styles from './page.module.css'
import LoginForm from './login-form'

export default function Login() {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Welcome Back</h1>
            <p className={styles.loginSubtitle}>Sign in to continue to Rovor</p>
            
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  )
}

