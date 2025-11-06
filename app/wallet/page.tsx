'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

// Currency to Rcoin conversion rates (sample rates)
const currencyRates: { [key: string]: { rate: number, symbol: string, name: string } } = {
  USD: { rate: 10, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 11, symbol: '€', name: 'Euro' },
  GBP: { rate: 12.5, symbol: '£', name: 'British Pound' },
  INR: { rate: 0.12, symbol: '₹', name: 'Indian Rupee' },
  AED: { rate: 2.7, symbol: 'د.إ', name: 'UAE Dirham' },
  CAD: { rate: 7.5, symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { rate: 6.8, symbol: 'A$', name: 'Australian Dollar' },
  JPY: { rate: 0.07, symbol: '¥', name: 'Japanese Yen' },
  CNY: { rate: 1.4, symbol: '¥', name: 'Chinese Yuan' },
  RUB: { rate: 0.11, symbol: '₽', name: 'Russian Ruble' },
  THB: { rate: 0.28, symbol: '฿', name: 'Thai Baht' },
  KRW: { rate: 0.0075, symbol: '₩', name: 'South Korean Won' },
  SGD: { rate: 7.4, symbol: 'S$', name: 'Singapore Dollar' },
  MXN: { rate: 0.5, symbol: '$', name: 'Mexican Peso' },
  BRL: { rate: 2, symbol: 'R$', name: 'Brazilian Real' },
}

// Predefined recharge packages
const rechargePackages = [
  { amount: 10, coins: 100, bonus: 0, popular: false },
  { amount: 25, coins: 250, bonus: 25, popular: true },
  { amount: 50, coins: 500, bonus: 50, popular: false },
  { amount: 100, coins: 1000, bonus: 150, popular: true },
  { amount: 200, coins: 2000, bonus: 400, popular: false },
  { amount: 500, coins: 5000, bonus: 1500, popular: true },
]

export default function WalletPage() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [customAmount, setCustomAmount] = useState('')
  const [calculatedCoins, setCalculatedCoins] = useState(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const currentRate = currencyRates[selectedCurrency]

  const calculateCoins = (amount: number) => {
    return Math.floor(amount * currentRate.rate)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = parseFloat(value) || 0
    setCalculatedCoins(calculateCoins(numValue))
  }

  const handlePackageSelect = (packageAmount: number, packageCoins: number) => {
    setCustomAmount(packageAmount.toString())
    setCalculatedCoins(packageCoins)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logoLink}>
              <Image 
                src="/rovor-logo.svg" 
                alt="Rovor Logo" 
                width={40} 
                height={40}
                priority
              />
            </Link>
            <nav className={styles.navLinks}>
              <a href="#" className={styles.navLink}>
                <Image src="/live.svg" alt="Live" width={20} height={20} className={styles.navIcon} />
                <span>Live</span>
              </a>
              <a href="#" className={styles.navLink}>
                <Image src="/call.svg" alt="Call" width={20} height={20} className={styles.navIcon} />
                <span>Call</span>
              </a>
              <Link href="/chat" className={styles.navLink}>
                <Image src="/Group 1.svg" alt="Chat" width={20} height={20} className={styles.navIcon} />
                <span>Chat</span>
              </Link>
            </nav>
          </div>

          <div className={styles.headerCenter}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="What are you looking for..." 
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.headerRight}>
            <Link href="/wallet" className={styles.walletBalance}>
              <div className={styles.walletIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10H23" stroke="#E63946" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.balanceInfo}>
                <span className={styles.balanceLabel}>Balance</span>
                <span className={styles.balanceAmount}>1,250 Rcoins</span>
              </div>
            </Link>
            <div className={styles.userProfile} ref={profileMenuRef}>
              <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <Image 
                  src="/sample/Ellipse 26.svg" 
                  alt="User Profile" 
                  width={40} 
                  height={40}
                  className={styles.userProfileImage}
                />
              </div>
              {showProfileMenu && (
                <div className={styles.profileMenu}>
                  <Link href="/profile/user" className={styles.menuItem}>Profile</Link>
                  <Link href="/liked-profiles" className={styles.menuItem}>Liked Profiles</Link>
                  <Link href="/service-info" className={styles.menuItem}>Service Info</Link>
                  <Link href="/about" className={styles.menuItem}>About</Link>
                  <Link href="/agencies-program" className={styles.menuItem}>Rovor's Agencies Program</Link>
                  <Link href="/resellers-program" className={styles.menuItem}>Rovor's Resellers Program</Link>
                  <Link href="/legal" className={styles.menuItem}>Legal Information</Link>
                  <Link href="/support" className={styles.menuItem}>Customer Support</Link>
                  <Link href="/app" className={styles.menuItem}>Get Rovor App</Link>
                  <div className={styles.menuDivider}></div>
                  <p className={styles.menuMessage}>Stay connected with your friends anywhere and anytime!</p>
                  <div className={styles.menuDivider}></div>
                  <Link href="/login" className={styles.menuItemLogout}>Logout</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroBackButton}>
              <Link href="/recommended" className={styles.backButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </Link>
            </div>
            <div className={styles.heroText}>
              <div className={styles.coinIcon}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" fill="url(#coinGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                  <path d="M40 20C29.5 20 21 28.5 21 39C21 49.5 29.5 58 40 58C50.5 58 59 49.5 59 39C59 28.5 50.5 20 40 20Z" fill="white" opacity="0.9"/>
                  <path d="M40 25C32.3 25 26 31.3 26 39C26 46.7 32.3 53 40 53C47.7 53 54 46.7 54 39C54 31.3 47.7 25 40 25Z" fill="url(#coinGradient)"/>
                  <text x="40" y="42" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="var(--font-poppins)">R</text>
                  <defs>
                    <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
                      <stop offset="50%" stopColor="#FFA500" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#FF8C00" stopOpacity="1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className={styles.heroTitle}>
                <span className={styles.titleHighlight}>Rcoins</span> Wallet
              </h1>
              <p className={styles.heroSubtitle}>Your gateway to unlimited connections</p>
              <div className={styles.currentBalanceCard}>
                <div className={styles.balanceLabel}>Current Balance</div>
                <div className={styles.balanceAmount}>1,250 <span className={styles.coinUnit}>Rcoins</span></div>
                <div className={styles.balanceSubtext}>Ready to use</div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.floatingCoins}>
                <div className={styles.coin1}>🪙</div>
                <div className={styles.coin2}>🪙</div>
                <div className={styles.coin3}>🪙</div>
                <div className={styles.coin4}>🪙</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.walletContainer}>

            <div className={styles.currencySection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>💱</div>
                <div>
                  <h2 className={styles.sectionTitle}>Select Currency</h2>
                  <p className={styles.sectionDescription}>Choose your preferred payment currency</p>
                </div>
              </div>
              <div className={styles.currencyGrid}>
                {Object.entries(currencyRates).slice(0, 8).map(([code, data]) => (
                  <button
                    key={code}
                    className={`${styles.currencyCard} ${selectedCurrency === code ? styles.currencyCardActive : ''}`}
                    onClick={() => {
                      setSelectedCurrency(code)
                      if (customAmount) {
                        handleCustomAmountChange(customAmount)
                      }
                    }}
                  >
                    <div className={styles.currencySymbol}>{data.symbol}</div>
                    <div className={styles.currencyCode}>{code}</div>
                    <div className={styles.currencyRate}>{data.rate} Rcoins</div>
                  </button>
                ))}
              </div>
              <select 
                className={styles.currencySelect}
                value={selectedCurrency}
                onChange={(e) => {
                  setSelectedCurrency(e.target.value)
                  if (customAmount) {
                    handleCustomAmountChange(customAmount)
                  }
                }}
              >
                {Object.entries(currencyRates).map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.symbol} {code} - {data.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.calculatorSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>🧮</div>
                <div>
                  <h2 className={styles.sectionTitle}>Coin Calculator</h2>
                  <p className={styles.sectionDescription}>Calculate how many Rcoins you'll receive</p>
                </div>
              </div>
              <div className={styles.calculatorBox}>
                <div className={styles.calculatorInputCard}>
                  <div className={styles.inputHeader}>
                    <span className={styles.inputIcon}>💵</span>
                    <label className={styles.inputLabel}>Enter Amount</label>
                  </div>
                  <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>{currentRate.symbol}</span>
                    <input
                      type="number"
                      className={styles.amountInput}
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className={styles.quickAmounts}>
                    {[10, 25, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        className={styles.quickAmountBtn}
                        onClick={() => handleCustomAmountChange(amount.toString())}
                      >
                        {currentRate.symbol}{amount}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.calculatorArrow}>
                  <div className={styles.arrowLine}></div>
                  <div className={styles.arrowHead}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M12 8L20 16L12 24" stroke="#E63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.calculatorOutputCard}>
                  <div className={styles.outputHeader}>
                    <span className={styles.outputIcon}>🪙</span>
                    <label className={styles.inputLabel}>You'll Receive</label>
                  </div>
                  <div className={styles.coinsDisplay}>
                    <span className={styles.coinsAmount}>{calculatedCoins.toLocaleString()}</span>
                    <span className={styles.coinsLabel}>Rcoins</span>
                  </div>
                  <div className={styles.rateBadge}>
                    <span className={styles.rateIcon}>↔️</span>
                    <span>1 {selectedCurrency} = {currentRate.rate} Rcoins</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.packagesSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>📦</div>
                <div>
                  <h2 className={styles.sectionTitle}>Recharge Packages</h2>
                  <p className={styles.sectionDescription}>Choose the perfect package for you</p>
                </div>
              </div>
              <div className={styles.packagesGrid}>
                {rechargePackages.map((pkg, index) => {
                  const totalCoins = pkg.coins + pkg.bonus
                  const packageAmount = pkg.amount * (currentRate.rate / currencyRates.USD.rate)
                  return (
                    <div 
                      key={index} 
                      className={`${styles.packageCard} ${pkg.popular ? styles.popularCard : ''}`}
                      onClick={() => handlePackageSelect(packageAmount, totalCoins)}
                    >
                      {pkg.popular && (
                        <div className={styles.popularBadge}>
                          <span className={styles.badgeIcon}>⭐</span>
                          <span>Most Popular</span>
                        </div>
                      )}
                      <div className={styles.packageHeader}>
                        <div className={styles.packageIcon}>💎</div>
                        <div className={styles.packageAmount}>
                          {currentRate.symbol}{packageAmount.toFixed(2)}
                        </div>
                      </div>
                      <div className={styles.packageCoins}>
                        <div className={styles.coinsMain}>
                          <span className={styles.coinsValue}>{totalCoins.toLocaleString()}</span>
                          <span className={styles.coinsText}>Rcoins</span>
                        </div>
                        {pkg.bonus > 0 && (
                          <div className={styles.bonusBadge}>
                            <span className={styles.bonusIcon}>🎁</span>
                            <span>+{pkg.bonus.toLocaleString()} Bonus</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.packageFeatures}>
                        <div className={styles.featureItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span>Instant Credit</span>
                        </div>
                        <div className={styles.featureItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span>No Expiry</span>
                        </div>
                      </div>
                      <button className={styles.rechargeButton}>
                        <span>Recharge Now</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.offersSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>🎯</div>
                <div>
                  <h2 className={styles.sectionTitle}>Special Offers</h2>
                  <p className={styles.sectionDescription}>Limited time deals and exclusive bonuses</p>
                </div>
              </div>
              <div className={styles.offersGrid}>
                <div className={`${styles.offerCard} ${styles.offerCard1}`}>
                  <div className={styles.offerGradient}></div>
                  <div className={styles.offerContent}>
                    <div className={styles.offerIcon}>🎁</div>
                    <div className={styles.offerRibbon}>New User</div>
                    <h3 className={styles.offerTitle}>First Recharge Bonus</h3>
                    <p className={styles.offerDescription}>Get 50% extra coins on your first recharge! Start your journey with a bonus.</p>
                    <div className={styles.offerBadge}>
                      <span className={styles.badgeValue}>+50%</span>
                      <span className={styles.badgeText}>Bonus</span>
                    </div>
                    <button className={styles.offerButton}>Claim Offer</button>
                  </div>
                </div>
                <div className={`${styles.offerCard} ${styles.offerCard2}`}>
                  <div className={styles.offerGradient}></div>
                  <div className={styles.offerContent}>
                    <div className={styles.offerIcon}>⚡</div>
                    <div className={styles.offerRibbon}>Limited Time</div>
                    <h3 className={styles.offerTitle}>Weekly Special</h3>
                    <p className={styles.offerDescription}>Recharge 100+ and get 25% bonus coins. Valid this week only!</p>
                    <div className={styles.offerBadge}>
                      <span className={styles.badgeValue}>+25%</span>
                      <span className={styles.badgeText}>Bonus</span>
                    </div>
                    <button className={styles.offerButton}>Claim Offer</button>
                  </div>
                </div>
                <div className={`${styles.offerCard} ${styles.offerCard3}`}>
                  <div className={styles.offerGradient}></div>
                  <div className={styles.offerContent}>
                    <div className={styles.offerIcon}>💎</div>
                    <div className={styles.offerRibbon}>Premium</div>
                    <h3 className={styles.offerTitle}>VIP Member</h3>
                    <p className={styles.offerDescription}>Recharge 500+ monthly for VIP benefits and exclusive perks.</p>
                    <div className={styles.offerBadge}>
                      <span className={styles.badgeValue}>VIP</span>
                      <span className={styles.badgeText}>Access</span>
                    </div>
                    <button className={styles.offerButton}>Learn More</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>ℹ️</div>
                <div>
                  <h2 className={styles.sectionTitle}>How Rcoins Work</h2>
                  <p className={styles.sectionDescription}>Everything you need to know about Rcoins</p>
                </div>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>💬</div>
                  <h3 className={styles.infoCardTitle}>Messaging</h3>
                  <p className={styles.infoCardText}>Use Rcoins to message partners and start meaningful conversations</p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>📞</div>
                  <h3 className={styles.infoCardTitle}>Video Calls</h3>
                  <p className={styles.infoCardText}>Connect face-to-face with video calls using your Rcoins</p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>⭐</div>
                  <h3 className={styles.infoCardTitle}>Premium Features</h3>
                  <p className={styles.infoCardText}>Unlock exclusive content and premium features with Rcoins</p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>♾️</div>
                  <h3 className={styles.infoCardTitle}>No Expiry</h3>
                  <p className={styles.infoCardText}>Your balance never expires - use them anytime, anywhere</p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>🔒</div>
                  <h3 className={styles.infoCardTitle}>Secure Payment</h3>
                  <p className={styles.infoCardText}>Multiple currency support with secure payment processing</p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>⚡</div>
                  <h3 className={styles.infoCardTitle}>Instant Credit</h3>
                  <p className={styles.infoCardText}>Get your Rcoins instantly after successful payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

