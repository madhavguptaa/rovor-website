import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <a href="#" className={styles.navLink}>
              <Image src="/live.svg" alt="Live" width={20} height={20} className={styles.navIcon} />
              <span>Live</span>
            </a>
            <a href="#" className={styles.navLink}>
              <Image src="/call.svg" alt="Call" width={20} height={20} className={styles.navIcon} />
              <span>Call</span>
            </a>
            <a href="#" className={styles.navLink}>
              <Image src="/Group 1.svg" alt="Chat" width={20} height={20} className={styles.navIcon} />
              <span>Chat</span>
            </a>
          </div>
          
          <div className={styles.logo}>
            <Image 
              src="/rovor-logo.svg" 
              alt="Rovor Logo" 
              width={40} 
              height={40}
              priority
            />
          </div>
          
          <button className={styles.menuButton}>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Large rovor text overlay */}
          <h1 className={styles.rovorOverlay}>rovor</h1>
          
          {/* Center headline above girl image */}
          <div className={styles.centerHeadline}>
            <h2 className={styles.headlineText}>
              The Stage is <span className={styles.highlightWord}>Global</span>. The Mic is <span className={styles.highlightWord}>Yours</span>.
            </h2>
          </div>

          {/* Left text block */}
          <div className={styles.leftTextBlock}>
            <p className={styles.leftText}>
              <span className={styles.iconBubble}>
                <Image src="/small-icon-hero.svg" alt="Icon" width={24} height={24} />
              </span>
              Go live, connect worldwide, and keep it real — always on your terms.
            </p>
          </div>
          
          {/* Right text block */}
          <div className={styles.rightTextBlock}>
            <p className={styles.rightSubText}>
              <span className={styles.iconBubble}>
                <Image src="/small-icon-hero1.svg" alt="Icon" width={24} height={24} />
              </span>
              Learn, laugh, coach, connect — ROVOR's got your people
              <span className={styles.iconBubble}>
                <Image src="/small-icon-hero2.svg" alt="Icon" width={24} height={24} />
              </span>
            </p>
          </div>
          
          {/* Central image - Woman taking selfie */}
          <div className={styles.heroImage}>
            <Image 
              src="/girl-hero.svg" 
              alt="Woman taking selfie" 
              width={600} 
              height={700}
              className={styles.heroImageSvg}
              priority
            />
          </div>
          
          {/* Bottom CTA Section */}
          <div className={styles.ctaSection}>
            <Link href="/login" className={styles.emailButton}>
              <span>Continue with Email</span>
              <span className={styles.arrowIcon}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </Link>
            <div className={styles.separator}>
              <div className={styles.slantLine}></div>
              <span className={styles.orText}>or</span>
              <div className={styles.slantLine}></div>
            </div>
            <div className={styles.socialIcons}>
              <div className={styles.googleIcon}>
                <Image src="/google-login.svg" alt="Google login" width={34} height={36} />
              </div>
              <div className={styles.phoneIcon}>
                <Image src="/phone-login.svg" alt="Phone login" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

