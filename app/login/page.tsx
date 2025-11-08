import Image from 'next/image'

import styles from './page.module.css'
import LoginForm from './login-form'

export default function Login() {
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.formColumn}>
          <header className={styles.heading}>
            <h1 className={styles.formTitle}>Welcome Back</h1>
            <p className={styles.formSubtitle}>Enter your details to sign in to your account.</p>
          </header>
          <LoginForm />
        </section>

        <aside className={styles.heroColumn}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <Image
              src="/rovor-logo.svg"
              alt="Rovor logo"
              width={140}
              height={40}
              className={styles.heroLogo}
              priority
            />
            <span className={styles.heroGreeting}>Hello,</span>
            <span className={styles.heroWelcome}>welcome</span>
            <Image
              src="/small-icon-hero.svg"
              alt="Rovor accent icon"
              width={42}
              height={42}
              className={styles.heroMark}
            />
          </div>
        </aside>
      </main>
    </div>
  )
}
