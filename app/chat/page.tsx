'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

// Sample followed users (people the user has followed)
const followedUsers = [
  { id: 1, name: 'Alia', image: '/sample/Ellipse 26.svg', lastMessage: 'Hey! How are you?', time: '2:30 PM', unread: 2 },
  { id: 2, name: 'Preeti', image: '/sample/Ellipse 28.svg', lastMessage: 'Thanks for the message!', time: '1:15 PM', unread: 0 },
  { id: 3, name: 'Joy', image: '/sample/Ellipse 30.svg', lastMessage: 'See you soon!', time: '12:45 PM', unread: 1 },
  { id: 4, name: 'Sasha', image: '/sample/Ellipse 39.svg', lastMessage: 'That sounds great!', time: '11:20 AM', unread: 0 },
  { id: 5, name: 'Ayesha', image: '/sample/Ellipse 42.svg', lastMessage: 'Let me know when you\'re free', time: 'Yesterday', unread: 3 },
  { id: 6, name: 'Anya', image: '/sample/Ellipse 46.svg', lastMessage: 'Thanks!', time: 'Yesterday', unread: 0 },
  { id: 7, name: 'Sushi', image: '/sample/Ellipse 50.svg', lastMessage: 'How was your day?', time: '2 days ago', unread: 0 },
  { id: 8, name: 'Pisha', image: '/sample/Ellipse 26.svg', lastMessage: 'Looking forward to it!', time: '2 days ago', unread: 0 },
]

// Sample messages for each user
const userMessages: { [key: number]: Array<{ id: number, text: string, time: string, sender: 'me' | 'them' }> } = {
  1: [
    { id: 1, text: 'Hey! How are you?', time: '2:25 PM', sender: 'them' },
    { id: 2, text: 'I\'m doing great, thanks! How about you?', time: '2:27 PM', sender: 'me' },
    { id: 3, text: 'I\'m good too! Just working on some projects.', time: '2:30 PM', sender: 'them' },
  ],
  2: [
    { id: 1, text: 'Hi there!', time: '1:10 PM', sender: 'me' },
    { id: 2, text: 'Thanks for the message!', time: '1:15 PM', sender: 'them' },
  ],
  3: [
    { id: 1, text: 'See you soon!', time: '12:45 PM', sender: 'them' },
  ],
  4: [
    { id: 1, text: 'That sounds great!', time: '11:20 AM', sender: 'them' },
  ],
  5: [
    { id: 1, text: 'Let me know when you\'re free', time: '11:00 AM', sender: 'them' },
  ],
  6: [
    { id: 1, text: 'Thanks!', time: '10:30 AM', sender: 'them' },
  ],
  7: [
    { id: 1, text: 'How was your day?', time: '9:00 AM', sender: 'them' },
  ],
  8: [
    { id: 1, text: 'Looking forward to it!', time: '8:00 AM', sender: 'them' },
  ],
}

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [messages, setMessages] = useState<Array<{ id: number, text: string, time: string, sender: 'me' | 'them' }>>([])
  const [newMessage, setNewMessage] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (selectedUser) {
      setMessages(userMessages[selectedUser] || [])
    }
  }, [selectedUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        time: time,
        sender: 'me' as const
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const selectedUserData = selectedUser ? followedUsers.find(u => u.id === selectedUser) : null

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
        <div className={styles.chatContainer}>
          {/* Left Sidebar - User List */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Chats</h2>
              <div className={styles.sidebarActions}>
                <button className={styles.actionButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.actionButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
                  <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 15L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search or start new chat" 
                  className={styles.searchInputSidebar}
                />
              </div>
            </div>
            <div className={styles.userList}>
              {followedUsers.map((user) => (
                <div
                  key={user.id}
                  className={`${styles.userItem} ${selectedUser === user.id ? styles.userItemActive : ''}`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className={styles.userAvatar}>
                    <Image 
                      src={user.image} 
                      alt={user.name}
                      width={50}
                      height={50}
                      className={styles.avatarImage}
                    />
                    <div className={styles.onlineIndicator}></div>
                  </div>
                  <div className={styles.userInfo}>
                    <div className={styles.userNameRow}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.messageTime}>{user.time}</span>
                    </div>
                    <div className={styles.messagePreviewRow}>
                      <span className={styles.messagePreview}>{user.lastMessage}</span>
                      {user.unread > 0 && (
                        <span className={styles.unreadBadge}>{user.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className={styles.chatArea}>
            {selectedUserData ? (
              <>
                <div className={styles.chatHeader}>
                  <div className={styles.chatHeaderLeft}>
                    <div className={styles.chatAvatar}>
                      <Image 
                        src={selectedUserData.image} 
                        alt={selectedUserData.name}
                        width={40}
                        height={40}
                        className={styles.chatAvatarImage}
                      />
                      <div className={styles.chatOnlineIndicator}></div>
                    </div>
                    <div className={styles.chatUserInfo}>
                      <span className={styles.chatUserName}>{selectedUserData.name}</span>
                      <span className={styles.chatUserStatus}>online</span>
                    </div>
                  </div>
                  <div className={styles.chatHeaderActions}>
                    <button className={styles.chatActionButton}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button className={styles.chatActionButton}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2 3L18 17M18 3L2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.messagesContainer}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${message.sender === 'me' ? styles.messageSent : styles.messageReceived}`}
                    >
                      <div className={styles.messageBubble}>
                        <p className={styles.messageText}>{message.text}</p>
                        <span className={styles.messageTime}>{message.time}</span>
                        {message.sender === 'me' && (
                          <span className={styles.messageStatus}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef}></div>
                </div>
                <div className={styles.messageInputContainer}>
                  <button className={styles.attachButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59718 21.9983 8.005 21.9983C6.41282 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00171 17.5872 2.00171 15.995C2.00171 14.4028 2.63416 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80944 14.7186 1.38778 15.78 1.38778C16.8414 1.38778 17.8594 1.80944 18.61 2.56C19.3606 3.31056 19.7822 4.32863 19.7822 5.39C19.7822 6.45137 19.3606 7.46944 18.61 8.22L9.41 17.41C9.03482 17.7852 8.53122 17.9961 8.005 17.9961C7.47878 17.9961 6.97518 17.7852 6.6 17.41C6.22482 17.0348 6.01389 16.5312 6.01389 16.005C6.01389 15.4788 6.22482 14.9752 6.6 14.6L15.07 6.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <input
                    type="text"
                    className={styles.messageInput}
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                  <button 
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyChat}>
                <div className={styles.emptyChatIcon}>
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" stroke="#E63946" strokeWidth="3" strokeDasharray="8 8"/>
                    <path d="M40 50L60 70L80 50" stroke="#E63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.emptyChatTitle}>Select a chat to start messaging</h3>
                <p className={styles.emptyChatText}>Choose a conversation from the left to begin chatting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

