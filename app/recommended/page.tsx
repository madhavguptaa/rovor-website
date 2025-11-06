'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Recommended() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [followedProfiles, setFollowedProfiles] = useState<{ [key: number]: boolean }>({})
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

