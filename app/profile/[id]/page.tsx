'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

// Sample profile data
const profileData: { [key: number]: any } = {
  1: {
    id: 1,
    name: 'Alia',
    age: 23,
    location: 'New York, USA',
    interests: 'Travel, Gaming',
    bio: 'Passionate traveler and gaming enthusiast. Love exploring new places and connecting with people from around the world. Always up for an adventure! I\'ve visited over 30 countries and love sharing my travel stories. When I\'m not traveling, you can find me streaming games or trying new restaurants in the city.',
    image: '/sample/Ellipse 26.svg',
    joined: '2023',
    languages: ['English', 'Spanish'],
    hobbies: ['Traveling', 'Gaming', 'Photography', 'Reading'],
    education: 'Bachelor\'s in International Relations',
    occupation: 'Travel Blogger & Content Creator',
    favoriteDestinations: ['Tokyo', 'Paris', 'Bali', 'Iceland'],
  },
  2: {
    id: 2,
    name: 'Preeti',
    age: 23,
    location: 'Mumbai, India',
    interests: 'Travel, Gaming',
    bio: 'Food lover and travel enthusiast. I enjoy trying new cuisines and exploring different cultures. Gaming is my way to unwind after a long day. I run a food blog where I share authentic Indian recipes and restaurant reviews. Love connecting with foodies from around the world!',
    image: '/sample/Ellipse 28.svg',
    joined: '2023',
    languages: ['Hindi', 'English', 'Marathi'],
    hobbies: ['Cooking', 'Traveling', 'Gaming', 'Dancing'],
    education: 'Culinary Arts Diploma',
    occupation: 'Food Blogger & Chef',
    favoriteDestinations: ['Goa', 'Dubai', 'Singapore', 'Thailand'],
    socialMedia: '@preetifoodie',
  },
  3: {
    id: 3,
    name: 'Joy',
    age: 23,
    location: 'London, UK',
    interests: 'Travel, Gaming',
    bio: 'Creative soul who loves art and gaming. Always looking for new experiences and meaningful connections. Let\'s chat about life, games, and everything in between! I\'m a digital artist and streamer, sharing my creative process with the world.',
    image: '/sample/Ellipse 30.svg',
    joined: '2023',
    languages: ['English', 'French'],
    hobbies: ['Art', 'Gaming', 'Music', 'Traveling'],
    education: 'BA in Fine Arts',
    occupation: 'Digital Artist & Streamer',
    favoriteDestinations: ['Amsterdam', 'Prague', 'Vienna', 'Edinburgh'],
    socialMedia: '@joycreates',
  },
  4: {
    id: 4,
    name: 'Sasha',
    age: 23,
    location: 'Berlin, Germany',
    interests: 'Travel, Gaming',
    bio: 'Fitness enthusiast and gaming pro. Love staying active and competitive gaming. Always ready for a challenge! I train daily and compete in esports tournaments. Let\'s push our limits together!',
    image: '/sample/Ellipse 39.svg',
    joined: '2023',
    languages: ['German', 'English'],
    hobbies: ['Fitness', 'Gaming', 'Hiking', 'Swimming'],
    education: 'Sports Science Degree',
    occupation: 'Fitness Trainer & Esports Player',
    favoriteDestinations: ['Switzerland', 'Austria', 'Norway', 'Sweden'],
    socialMedia: '@sashafit',
  },
  5: {
    id: 5,
    name: 'Ayesha',
    age: 23,
    location: 'Dubai, UAE',
    interests: 'Travel, Gaming',
    bio: 'Fashionista and travel blogger. Love documenting my adventures and sharing fashion tips. Always on the lookout for the next destination! I\'ve collaborated with major fashion brands and love creating content.',
    image: '/sample/Ellipse 42.svg',
    joined: '2023',
    languages: ['Arabic', 'English', 'Urdu'],
    hobbies: ['Fashion', 'Traveling', 'Blogging', 'Photography'],
    education: 'Fashion Design Diploma',
    occupation: 'Fashion Influencer & Blogger',
    favoriteDestinations: ['Maldives', 'Seychelles', 'Mauritius', 'Zanzibar'],
    socialMedia: '@ayeshastyle',
  },
  6: {
    id: 6,
    name: 'Anya',
    age: 23,
    location: 'Moscow, Russia',
    interests: 'Travel, Gaming',
    bio: 'Music lover and gaming enthusiast. Play piano in my free time and enjoy competitive gaming. Love connecting with people who share similar interests! I perform at local venues and stream my gaming sessions.',
    image: '/sample/Ellipse 46.svg',
    joined: '2023',
    languages: ['Russian', 'English'],
    hobbies: ['Music', 'Gaming', 'Piano', 'Reading'],
    education: 'Music Conservatory',
    occupation: 'Pianist & Gaming Streamer',
    favoriteDestinations: ['St. Petersburg', 'Sochi', 'Kazan', 'Vladivostok'],
    socialMedia: '@anyamusic',
  },
  7: {
    id: 7,
    name: 'Sushi',
    age: 23,
    location: 'Tokyo, Japan',
    interests: 'Travel, Gaming',
    bio: 'Anime fan and tech enthusiast. Love Japanese culture and gaming. Always excited to meet new people and share experiences! I review the latest tech gadgets and create anime content.',
    image: '/sample/Ellipse 50.svg',
    joined: '2023',
    languages: ['Japanese', 'English'],
    hobbies: ['Anime', 'Gaming', 'Technology', 'Manga'],
    education: 'Computer Science Degree',
    occupation: 'Tech Reviewer & Content Creator',
    favoriteDestinations: ['Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
    socialMedia: '@sushitech',
  },
  8: {
    id: 8,
    name: 'Pisha',
    age: 23,
    location: 'Sydney, Australia',
    interests: 'Travel, Gaming',
    bio: 'Beach lover and adventure seeker. Enjoy surfing, gaming, and exploring the outdoors. Life is an adventure, let\'s make it count! I document my adventures and share tips for outdoor enthusiasts.',
    image: '/sample/Ellipse 26.svg',
    joined: '2023',
    languages: ['English'],
    hobbies: ['Surfing', 'Gaming', 'Hiking', 'Beach'],
    education: 'Marine Biology Degree',
    occupation: 'Adventure Guide & Content Creator',
    favoriteDestinations: ['Gold Coast', 'Byron Bay', 'Whitsundays', 'Great Barrier Reef'],
    socialMedia: '@pishaadventures',
  },
  9: {
    id: 9,
    name: 'Maya',
    age: 24,
    location: 'Paris, France',
    interests: 'Music, Art',
    bio: 'Artist and musician at heart. Love painting, playing guitar, and exploring art galleries. Always inspired by creativity and beauty. My artwork has been featured in several galleries across Europe.',
    image: '/sample/Ellipse 28.svg',
    joined: '2023',
    languages: ['French', 'English', 'Spanish'],
    hobbies: ['Painting', 'Music', 'Art Galleries', 'Photography'],
    education: 'École des Beaux-Arts',
    occupation: 'Visual Artist & Musician',
    favoriteDestinations: ['Provence', 'Nice', 'Lyon', 'Bordeaux'],
    socialMedia: '@mayart',
  },
  10: {
    id: 10,
    name: 'Riya',
    age: 22,
    location: 'Bangkok, Thailand',
    interests: 'Dancing, Cooking',
    bio: 'Dancer and food enthusiast. Love traditional Thai dance and cooking authentic dishes. Always happy to share recipes and dance moves! I teach dance classes and run a cooking channel.',
    image: '/sample/Ellipse 30.svg',
    joined: '2023',
    languages: ['Thai', 'English'],
    hobbies: ['Dancing', 'Cooking', 'Yoga', 'Traveling'],
    education: 'Performing Arts Degree',
    occupation: 'Dance Instructor & Chef',
    favoriteDestinations: ['Phuket', 'Chiang Mai', 'Krabi', 'Pattaya'],
    socialMedia: '@riyadance',
  },
  11: {
    id: 11,
    name: 'Zara',
    age: 25,
    location: 'Toronto, Canada',
    interests: 'Fitness, Reading',
    bio: 'Fitness coach and bookworm. Love helping people achieve their fitness goals and discussing great books. Always learning and growing! I run a fitness studio and host a book club.',
    image: '/sample/Ellipse 39.svg',
    joined: '2023',
    languages: ['English', 'French'],
    hobbies: ['Fitness', 'Reading', 'Running', 'Meditation'],
    education: 'Kinesiology Degree',
    occupation: 'Certified Personal Trainer',
    favoriteDestinations: ['Vancouver', 'Banff', 'Montreal', 'Quebec City'],
    socialMedia: '@zarafit',
  },
  12: {
    id: 12,
    name: 'Luna',
    age: 21,
    location: 'Barcelona, Spain',
    interests: 'Photography, Nature',
    bio: 'Nature photographer and environmentalist. Love capturing beautiful moments in nature and advocating for our planet. Let\'s protect what we love! My photos have won several international awards.',
    image: '/sample/Ellipse 42.svg',
    joined: '2023',
    languages: ['Spanish', 'English', 'Catalan'],
    hobbies: ['Photography', 'Hiking', 'Nature', 'Environmental Activism'],
    education: 'Photography Degree',
    occupation: 'Nature Photographer',
    favoriteDestinations: ['Ibiza', 'Seville', 'Granada', 'Valencia'],
    socialMedia: '@lunanature',
  },
  13: {
    id: 13,
    name: 'Nina',
    age: 24,
    location: 'Amsterdam, Netherlands',
    interests: 'Yoga, Meditation',
    bio: 'Yoga instructor and wellness advocate. Passionate about mindfulness, meditation, and helping others find inner peace. Namaste! I lead retreats and teach online classes.',
    image: '/sample/Ellipse 46.svg',
    joined: '2023',
    languages: ['Dutch', 'English'],
    hobbies: ['Yoga', 'Meditation', 'Wellness', 'Reading'],
    education: 'Yoga Teacher Certification',
    occupation: 'Yoga Instructor & Wellness Coach',
    favoriteDestinations: ['Utrecht', 'Rotterdam', 'The Hague', 'Maastricht'],
    socialMedia: '@ninayoga',
  },
  14: {
    id: 14,
    name: 'Kira',
    age: 23,
    location: 'Seoul, South Korea',
    interests: 'Movies, Fashion',
    bio: 'Film buff and fashion designer. Love Korean cinema and creating unique fashion pieces. Always inspired by art and culture! I design K-fashion pieces and review the latest films.',
    image: '/sample/Ellipse 50.svg',
    joined: '2023',
    languages: ['Korean', 'English'],
    hobbies: ['Movies', 'Fashion Design', 'Art', 'Shopping'],
    education: 'Fashion Design Degree',
    occupation: 'Fashion Designer & Film Critic',
    favoriteDestinations: ['Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
    socialMedia: '@kirafashion',
  },
  15: {
    id: 15,
    name: 'Sara',
    age: 22,
    location: 'Rome, Italy',
    interests: 'Writing, Poetry',
    bio: 'Writer and poet. Love expressing thoughts through words and exploring the beauty of language. Always seeking inspiration in everyday life. I\'ve published two poetry collections.',
    image: '/sample/Ellipse 26.svg',
    joined: '2023',
    languages: ['Italian', 'English', 'French'],
    hobbies: ['Writing', 'Poetry', 'Reading', 'Café Hopping'],
    education: 'Literature Degree',
    occupation: 'Writer & Poet',
    favoriteDestinations: ['Florence', 'Venice', 'Milan', 'Naples'],
    socialMedia: '@sarawrites',
  },
  16: {
    id: 16,
    name: 'Emma',
    age: 24,
    location: 'Melbourne, Australia',
    interests: 'Sports, Adventure',
    bio: 'Adventure sports enthusiast and travel blogger. Love rock climbing, skydiving, and exploring the world. Life is too short for boring adventures! I document extreme sports and travel experiences.',
    image: '/sample/Ellipse 28.svg',
    joined: '2023',
    languages: ['English'],
    hobbies: ['Rock Climbing', 'Skydiving', 'Traveling', 'Blogging'],
    education: 'Sports Science Degree',
    occupation: 'Adventure Sports Instructor',
    favoriteDestinations: ['Cairns', 'Perth', 'Adelaide', 'Tasmania'],
    socialMedia: '@emmaadventure',
  },
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const profileId = parseInt(params.id)
  const profile = profileData[profileId]

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

  if (!profile) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Profile Not Found</h1>
          <Link href="/recommended" className={styles.backLink}>Back to Recommended</Link>
        </div>
      </div>
    )
  }

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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                  <Link href="/agencies-program" className={styles.menuItem}>Rovor&apos;s Agencies Program</Link>
                  <Link href="/resellers-program" className={styles.menuItem}>Rovor&apos;s Resellers Program</Link>
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
          <Link href="/recommended" className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Recommended</span>
          </Link>

          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImageSection}>
                <Image 
                  src={profile.image} 
                  alt={profile.name}
                  width={150}
                  height={150}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>{profile.name}, {profile.age}</h1>
                <p className={styles.profileLocation}>{profile.location}</p>
                <p className={styles.profileJoined}>Joined {profile.joined}</p>
                <div className={styles.actionButtons}>
                  <button className={styles.messageButton}>
                    <Image src="/Group 1.svg" alt="Message" width={20} height={20} />
                    <span>Message</span>
                    <span className={styles.priceTag}>50 Rcoins</span>
                  </button>
                  <button className={styles.callButton}>
                    <Image src="/call.svg" alt="Call" width={20} height={20} />
                    <span>Call</span>
                    <span className={styles.priceTag}>100 Rcoins/min</span>
                  </button>
                  <button 
                    className={`${styles.addButton} ${isFollowing ? styles.following : ''}`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.tickIcon}>
                        <path d="M16.667 5L7.5 14.167 3.333 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.plusIcon}>
                        <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.profileContent}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>About</h2>
                <p className={styles.bio}>{profile.bio}</p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Interests</h2>
                <div className={styles.interestsList}>
                  {profile.hobbies.map((hobby: string, index: number) => (
                    <span key={index} className={styles.interestTag}>{hobby}</span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Languages</h2>
                <div className={styles.languagesList}>
                  {profile.languages.map((lang: string, index: number) => (
                    <span key={index} className={styles.languageTag}>{lang}</span>
                  ))}
                </div>
              </div>

              {profile.education && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Education</h2>
                  <p className={styles.infoText}>{profile.education}</p>
                </div>
              )}

              {profile.occupation && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Occupation</h2>
                  <p className={styles.infoText}>{profile.occupation}</p>
                </div>
              )}

              {profile.favoriteDestinations && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Favorite Destinations</h2>
                  <div className={styles.destinationsList}>
                    {profile.favoriteDestinations.map((dest: string, index: number) => (
                      <span key={index} className={styles.destinationTag}>{dest}</span>
                    ))}
                  </div>
                </div>
              )}


              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Album</h2>
                <div className={styles.albumGrid}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className={styles.albumItem}>
                      <Image 
                        src={profile.image} 
                        alt={`Album ${item}`}
                        width={150}
                        height={200}
                        className={styles.albumImage}
                      />
                      {item > 3 && (
                        <div className={styles.lockedOverlay}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 1C8.13 1 5 4.13 5 8V10H4C2.9 10 2 10.9 2 12V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12C22 10.9 21.1 10 20 10H19V8C19 4.13 15.87 1 12 1ZM12 3C14.76 3 17 5.24 17 8V10H7V8C7 5.24 9.24 3 12 3Z" fill="white"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.unlockSection}>
                  <div className={styles.unlockContent}>
                    <h2 className={styles.unlockTitle}>Unlock More</h2>
                    <p className={styles.unlockDescription}>
                      Get access to exclusive photos, videos, and content from {profile.name}
                    </p>
                    <div className={styles.unlockFeatures}>
                      <div className={styles.unlockFeature}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#E63946"/>
                        </svg>
                        <span>Exclusive Photos</span>
                      </div>
                      <div className={styles.unlockFeature}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#E63946"/>
                        </svg>
                        <span>Private Videos</span>
                      </div>
                      <div className={styles.unlockFeature}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#E63946"/>
                        </svg>
                        <span>Direct Messages</span>
                      </div>
                    </div>
                    <button className={styles.unlockButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1C8.13 1 5 4.13 5 8V10H4C2.9 10 2 10.9 2 12V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12C22 10.9 21.1 10 20 10H19V8C19 4.13 15.87 1 12 1ZM12 3C14.76 3 17 5.24 17 8V10H7V8C7 5.24 9.24 3 12 3Z" fill="white"/>
                      </svg>
                      <span>Unlock for 99 Rcoins</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

