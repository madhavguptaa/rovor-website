'use client'

import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

const liveStreams = [
  {
    id: 1,
    name: 'Alia',
    topic: 'Travel Stories & Q&A',
    avatar: '/sample/Ellipse 26.svg',
    videoId: 'dQw4w9WgXcQ',
    viewers: '2.3K watching now',
  },
  {
    id: 3,
    name: 'Joy',
    topic: 'Digital Art Session',
    avatar: '/sample/Ellipse 30.svg',
    videoId: 'M3GKeuC0ia0',
    viewers: '1.8K watching now',
  },
  {
    id: 5,
    name: 'Ayesha',
    topic: 'Fashion Styling Live',
    avatar: '/sample/Ellipse 42.svg',
    videoId: 'fLexgOxsZu0',
    viewers: '3.1K watching now',
  },
  {
    id: 7,
    name: 'Sushi',
    topic: 'Tech & Anime Chat',
    avatar: '/sample/Ellipse 50.svg',
    videoId: 'oHg5SJYRHA0',
    viewers: '980 watching now',
  },
]

export default function LivePage() {
  return (
    <div className={styles.container}>
      <Header activeNav="live" />

      <main className={styles.main}>
        <div className={styles.headingRow}>
          <div>
            <h1 className={styles.pageTitle}>Live Now</h1>
            <p className={styles.pageSubtitle}>Join creators who are streaming in real-time and say hello.</p>
          </div>
          <Link href="/recommended" className={styles.linkAll}>
            Explore All Creators
          </Link>
        </div>

        <div className={styles.liveGrid}>
          {liveStreams.map((stream) => (
            <article key={stream.id} className={styles.liveCard}>
              <div className={styles.previewWrap}>
                <iframe
                  src={`https://www.youtube.com/embed/${stream.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${stream.videoId}&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${stream.name} live stream`}
                  className={styles.previewEmbed}
                ></iframe>
                <span className={styles.liveBadge}>
                  <span className={styles.liveDot} /> Live
                </span>
                <span className={styles.viewerChip}>{stream.viewers}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.presenter}>
                  <Image src={stream.avatar} alt={stream.name} width={56} height={56} className={styles.presenterAvatar} />
                  <div className={styles.presenterInfo}>
                    <p className={styles.presenterName}>{stream.name}</p>
                    <span className={styles.presenterTopic}>{stream.topic}</span>
                  </div>
                </div>
                <Link href={`/profile/${stream.id}`} className={styles.joinLink}>
                  Join
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
