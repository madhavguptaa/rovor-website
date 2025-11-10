'use client'

import { useMemo, useState } from 'react'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

type CurrencyKey = keyof typeof currencyRates

type Transaction = {
  id: number
  type: 'Top up' | 'Call' | 'Withdrawal'
  amount: string
  coins: string
  timestamp: string
  status: 'Completed' | 'Processing'
}

const currencyRates = {
  USD: { rate: 10, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 11, symbol: '€', name: 'Euro' },
  GBP: { rate: 12.5, symbol: '£', name: 'British Pound' },
  INR: { rate: 0.12, symbol: '₹', name: 'Indian Rupee' },
  AED: { rate: 2.7, symbol: 'د.إ', name: 'UAE Dirham' },
  CAD: { rate: 7.5, symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { rate: 6.8, symbol: 'A$', name: 'Australian Dollar' },
  SGD: { rate: 7.4, symbol: 'S$', name: 'Singapore Dollar' },
} satisfies Record<string, { rate: number; symbol: string; name: string }>

const rechargePackages = [
  { amount: 25, coins: 250, bonus: 0 },
  { amount: 50, coins: 520, bonus: 20 },
  { amount: 100, coins: 1100, bonus: 100 },
  { amount: 250, coins: 2900, bonus: 400 },
]

const activity: Transaction[] = [
  { id: 1, type: 'Top up', amount: '$50.00', coins: '+520', timestamp: 'Today · 10:22 AM', status: 'Completed' },
  { id: 2, type: 'Call', amount: '--', coins: '-180', timestamp: 'Yesterday · 9:10 PM', status: 'Completed' },
  { id: 3, type: 'Withdrawal', amount: '$120.00', coins: '--', timestamp: '12 Feb · 6:30 PM', status: 'Processing' },
]

export default function WalletPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>('USD')
  const [customAmount, setCustomAmount] = useState('')

  const currentRate = useMemo(() => currencyRates[selectedCurrency], [selectedCurrency])

  const coinsFromCustomAmount = useMemo(() => {
    const num = parseFloat(customAmount)
    if (Number.isNaN(num) || num <= 0) return 0
    return Math.floor(num * currentRate.rate)
  }, [customAmount, currentRate.rate])

  const handlePackageSelect = (pkgAmount: number, pkgCoins: number) => {
    const localizedAmount = pkgAmount * (currentRate.rate / currencyRates.USD.rate)
    setCustomAmount(localizedAmount.toFixed(2))
  }

  return (
    <div className={styles.screen}>
      <Header />

      <main className={styles.main}>
        <section className={styles.heroRow}>
          <div className={styles.balanceCard}>
            <span className={styles.badge}>Wallet</span>
            <h1 className={styles.balanceTitle}>Manage your Rcoins</h1>
            <p className={styles.balanceSubtitle}>Track your balance, top up instantly, and review account activity.</p>
            <div className={styles.balanceValue}>
              1,250 <span>Rcoins</span>
            </div>
            <div className={styles.balanceActions}>
              <button type="button" className={styles.primaryButton}>
                Add Rcoins
              </button>
              <button type="button" className={styles.secondaryButton}>
                Withdraw
              </button>
            </div>
          </div>

          <div className={styles.summaryColumn}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Upcoming payout</p>
              <p className={styles.statValue}>$420.00</p>
              <span className={styles.statMeta}>Scheduled · 18 Feb</span>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Calls this month</p>
              <p className={styles.statValue}>27 sessions</p>
              <span className={styles.statMeta}>↑ 12% vs last month</span>
            </div>
          </div>
        </section>

        <section className={styles.managementGrid}>
          <div className={styles.panel}>
            <header className={styles.panelHeader}>
              <h2>Choose settlement currency</h2>
              <p>Rates are refreshed every morning at 09:00 UTC.</p>
            </header>

            <div className={styles.currencyGrid}>
              {Object.entries(currencyRates).map(([code, data]) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.currencyCard} ${selectedCurrency === code ? styles.currencyCardActive : ''}`}
                  onClick={() => setSelectedCurrency(code as CurrencyKey)}
                >
                  <span className={styles.currencySymbol}>{data.symbol}</span>
                  <span className={styles.currencyCode}>{code}</span>
                  <span className={styles.currencyRate}>{data.rate} Rcoins</span>
                </button>
              ))}
            </div>

            <select
              className={styles.currencySelect}
              value={selectedCurrency}
              onChange={(event) => setSelectedCurrency(event.target.value as CurrencyKey)}
            >
              {Object.entries(currencyRates).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.symbol} {code} · {data.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.panel}>
            <header className={styles.panelHeader}>
              <h2>Coin calculator</h2>
              <p>Estimate Rcoins before you confirm a recharge.</p>
            </header>

            <div className={styles.calculatorBox}>
              <label className={styles.inputLabel} htmlFor="custom-amount">
                Amount in {selectedCurrency}
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputPrefix}>{currentRate.symbol}</span>
                <input
                  id="custom-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                />
              </div>
              <div className={styles.quickButtons}>
                {[25, 50, 100, 200].map((value) => (
                  <button key={value} type="button" onClick={() => setCustomAmount(value.toString())}>
                    {currentRate.symbol}
                    {value}
                  </button>
                ))}
              </div>

              <div className={styles.calculatorSummary}>
                <span className={styles.summaryLabel}>You will receive</span>
                <span className={styles.summaryValue}>{coinsFromCustomAmount.toLocaleString()} Rcoins</span>
                <span className={styles.summaryMeta}>
                  1 {selectedCurrency} = {currentRate.rate} Rcoins
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.panel}>
          <header className={styles.panelHeader}>
            <h2>Recharge packages</h2>
            <p>Curated bundles with built-in bonuses for frequent callers.</p>
          </header>

          <div className={styles.packagesGrid}>
            {rechargePackages.map((pkg) => {
              const totalCoins = pkg.coins + pkg.bonus
              const displayAmount = pkg.amount * (currentRate.rate / currencyRates.USD.rate)

              return (
                <button key={pkg.amount} type="button" className={styles.packageCard} onClick={() => handlePackageSelect(pkg.amount, totalCoins)}>
                  <div className={styles.packageHeader}>
                    <span className={styles.packageAmount}>
                      {currentRate.symbol}
                      {displayAmount.toFixed(2)}
                    </span>
                    {pkg.bonus > 0 ? <span className={styles.packageBadge}>Includes {pkg.bonus} bonus Rcoins</span> : null}
                  </div>
                  <div className={styles.packageCoins}>{totalCoins.toLocaleString()} Rcoins</div>
                  <span className={styles.packageMeta}>One-time purchase · Instant credit</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.bottomGrid}>
          <div className={styles.panel}>
            <header className={styles.panelHeader}>
              <h2>Special offers</h2>
              <p>Seasonal programmes that help you earn Rcoins faster.</p>
            </header>
            <ul className={styles.offerList}>
              <li>
                <span className={styles.offerTitle}>Weekend Booster</span>
                <span className={styles.offerMeta}>Earn 15% extra Rcoins on Friday sessions</span>
              </li>
              <li>
                <span className={styles.offerTitle}>Referral Rewards</span>
                <span className={styles.offerMeta}>Invite partners and receive 200 Rcoins on activation</span>
              </li>
              <li>
                <span className={styles.offerTitle}>Early Settlement</span>
                <span className={styles.offerMeta}>Withdraw earnings twice a week during February</span>
              </li>
            </ul>
          </div>

          <div className={styles.panel}>
            <header className={styles.panelHeader}>
              <h2>Recent activity</h2>
              <p>Latest wallet-related events across your account.</p>
            </header>
            <div className={styles.activityList}>
              {activity.map((entry) => (
                <div key={entry.id} className={styles.activityRow}>
                  <div>
                    <span className={styles.activityType}>{entry.type}</span>
                    <span className={styles.activityMeta}>{entry.timestamp}</span>
                  </div>
                  <div className={styles.activityAmounts}>
                    {entry.amount !== '--' ? <span>{entry.amount}</span> : null}
                    {entry.coins !== '--' ? <span>{entry.coins} Rcoins</span> : null}
                    <span className={styles.activityStatus}>{entry.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
