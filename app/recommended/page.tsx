'use client'

import { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/shared/Header'

export default function Recommended() {
  const [followedProfiles, setFollowedProfiles] = useState<Record<number, boolean>>({})
  // Sample profile data with images and YouTube videos (portrait format for girls)
  const profiles = [
    { id: 1, name: 'Alia', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 26.svg', videoId: 'dQw4w9WgXcQ', followed: false },
    { id: 2, name: 'Preeti', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 28.svg', videoId: 'dQw4w9WgXcQ', followed: false },
    { id: 3, name: 'Joy', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 30.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 4, name: 'Sasha', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 39.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 5, name: 'Ayesha', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 42.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 6, name: 'Anya', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 46.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 7, name: 'Sushi', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 50.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 8, name: 'Pisha', age: 23, interests: 'Travel, Gaming', image: '/sample/Ellipse 26.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 9, name: 'Maya', age: 24, interests: 'Music, Art', image: '/sample/Ellipse 28.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 10, name: 'Riya', age: 22, interests: 'Dancing, Cooking', image: '/sample/Ellipse 30.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 11, name: 'Zara', age: 25, interests: 'Fitness, Reading', image: '/sample/Ellipse 39.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 12, name: 'Luna', age: 21, interests: 'Photography, Nature', image: '/sample/Ellipse 42.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 13, name: 'Nina', age: 24, interests: 'Yoga, Meditation', image: '/sample/Ellipse 46.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 14, name: 'Kira', age: 23, interests: 'Movies, Fashion', image: '/sample/Ellipse 50.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 15, name: 'Sara', age: 22, interests: 'Writing, Poetry', image: '/sample/Ellipse 26.svg', videoId: 'dQw4w9WgXcQ' },
    { id: 16, name: 'Emma', age: 24, interests: 'Sports, Adventure', image: '/sample/Ellipse 28.svg', videoId: 'dQw4w9WgXcQ' },
  ]

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.headingSection}>
            <h1 className={styles.heading}>Recommended</h1>
            <div className={styles.filtersSection}>
              <div className={styles.searchBarMain}>
                <span className={styles.searchIconMain}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Search profiles..." 
                  className={styles.searchInputMain}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.profileGrid}>
            {profiles.map((profile, index) => (
              <Link key={profile.id} href={`/profile/${profile.id}`} className={styles.profileCard}>
                <div className={styles.cardImage}>
                  <iframe
                    src={`https://www.youtube.com/embed/${profile.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${profile.videoId}&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                    className={styles.videoEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={`${profile.name} video`}
                    onLoad={() => {
                      // Force video to play and loop
                      const iframe = document.querySelector(`iframe[title="${profile.name} video"]`) as HTMLIFrameElement
                      if (iframe) {
                        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
                      }
                    }}
                  ></iframe>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.profilePicture}>
                    <Image 
                      src={profile.image} 
                      alt={profile.name}
                      width={70}
                      height={70}
                      className={styles.profileAvatar}
                    />
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.nameRow}>
                      <span className={styles.name}>{profile.name}</span>
                      <span className={styles.age}>{profile.age}</span>
                    </div>
                    <div className={styles.interests}>{profile.interests}</div>
                  </div>
                  <button 
                    className={`${styles.addButton} ${followedProfiles[profile.id] ? styles.following : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFollowedProfiles(prev => ({
                        ...prev,
                        [profile.id]: !prev[profile.id]
                      }));
                    }}
                  >
                    {followedProfiles[profile.id] ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.tickIcon}>
                        <path d="M13.333 4L6 11.333 2.667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.plusIcon}>
                        <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

