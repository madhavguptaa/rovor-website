'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

type ChatThread = {
  id: number
  name: string
  avatar: string
  preview: string
  time: string
}

type ChatMessage = {
  id: number
  text: string
  time: string
  sender: 'me' | 'them'
}

const chatThreads: ChatThread[] = [
  { id: 1, name: 'Aakansha', avatar: '/sample/Ellipse 26.svg', preview: 'Sent you a message', time: 'Just now' },
  { id: 2, name: 'Chuck', avatar: '/sample/Ellipse 30.svg', preview: 'Sent you a message', time: '5 mins.' },
  { id: 3, name: 'Juliana', avatar: '/sample/Ellipse 39.svg', preview: 'Sent you a message', time: '10 mins.' },
  { id: 4, name: 'Nate', avatar: '/sample/Ellipse 46.svg', preview: 'Sent you a message', time: '10 mins.' },
  { id: 5, name: 'Chuck', avatar: '/sample/Ellipse 30.svg', preview: 'Sent you a message', time: '5 mins.' },
  { id: 6, name: 'Juliana', avatar: '/sample/Ellipse 39.svg', preview: 'Sent you a message', time: '10 mins.' },
  { id: 7, name: 'Nate', avatar: '/sample/Ellipse 46.svg', preview: 'Sent you a message', time: '10 mins.' },
]

const seedMessages: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, text: 'Hey! How are you?', time: '2:25 PM', sender: 'them' },
    { id: 2, text: "I’m doing great, thanks! How about you?", time: '2:27 PM', sender: 'me' },
    { id: 3, text: 'I’m good too! Just working on some projects.', time: '2:30 PM', sender: 'them' },
  ],
  2: [
    { id: 1, text: 'Hi there!', time: '1:10 PM', sender: 'me' },
    { id: 2, text: 'Thanks for the message!', time: '1:15 PM', sender: 'them' },
  ],
  3: [{ id: 1, text: 'See you soon!', time: '12:45 PM', sender: 'them' }],
}

export default function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const activeThread = activeThreadId
    ? chatThreads.find((thread) => thread.id === activeThreadId) ?? null
    : null

  useEffect(() => {
    if (activeThreadId) {
      setMessages(seedMessages[activeThreadId] ? [...seedMessages[activeThreadId]] : [])
    } else {
      setMessages([])
    }
  }, [activeThreadId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeThreadId) return

    const now = new Date()
    const formatted = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: newMessage,
        time: formatted,
        sender: 'me',
      },
    ])
    setNewMessage('')
  }

  return (
    <div className={styles.container}>
      <Header activeNav="chat" />
      <div className={styles.pageHeader}>
        <Link href="/recommended" className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back to Recommended</span>
        </Link>
      </div>

      <section className={styles.layout}>
        <aside className={styles.sidebarCard}>
          <div className={styles.searchBoxSidebar}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.searchIcon}>
              <path d="M7.875 14.25C11.0478 14.25 13.625 11.6728 13.625 8.5C13.625 5.32721 11.0478 2.75 7.875 2.75C4.70221 2.75 2.125 5.32721 2.125 8.5C2.125 11.6728 4.70221 14.25 7.875 14.25Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.875 15.875L12.6875 12.6875" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input className={styles.searchInputSidebar} type="text" placeholder="Search or start new chat" />
          </div>

          <div className={styles.threads}>
            {chatThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThreadId(thread.id)}
                className={`${styles.threadItem} ${activeThreadId === thread.id ? styles.threadItemActive : ''}`}
              >
                <span className={styles.avatar}>
                  <Image src={thread.avatar} alt={thread.name} width={52} height={52} />
                </span>
                <span className={styles.threadInfo}>
                  <span className={styles.threadRow}>
                    <span className={styles.threadName}>{thread.name}</span>
                    <span className={styles.threadTime}>{thread.time}</span>
                  </span>
                  <span className={styles.threadPreview}>{thread.preview}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {activeThread ? (
          <div className={styles.conversationCard}>
            <header className={styles.conversationHeader}>
              <div className={styles.conversationTitle}>
                <span className={styles.conversationAvatar}>
                  <Image src={activeThread.avatar} alt={activeThread.name} width={44} height={44} />
                </span>
                <div>
                  <p className={styles.conversationName}>{activeThread.name}</p>
                  <span className={styles.conversationStatus}>Online now</span>
                </div>
              </div>
              <div className={styles.conversationActions}>
                <button type="button" className={styles.iconButton} aria-label="Start call">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.167 3.333H7.5L9.167 7.5L7.333 8.5C8.17 10.17 9.497 11.497 11.167 12.333L12.5 10.833L16.667 12.5V15.833C16.667 16.275 16.491 16.699 16.179 17.011C15.866 17.324 15.442 17.5 15 17.5C11.587 17.298 8.38 15.882 5.952 13.454C3.524 11.026 2.108 7.82 1.906 4.406C1.906 3.964 2.082 3.54 2.394 3.227C2.707 2.915 3.131 2.739 3.573 2.739L4.167 3.333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className={styles.iconButton} aria-label="More">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10.8333C10.4603 10.8333 10.8333 10.4603 10.8333 10C10.8333 9.53976 10.4603 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4603 9.53976 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 5.83333C10.4603 5.83333 10.8333 5.46024 10.8333 5C10.8333 4.53976 10.4603 4.16667 10 4.16667C9.53976 4.16667 9.16667 4.53976 9.16667 5C9.16667 5.46024 9.53976 5.83333 10 5.83333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 15.8333C10.4603 15.8333 10.8333 15.4602 10.8333 15C10.8333 14.5398 10.4603 14.1667 10 14.1667C9.53976 14.1667 9.16667 14.5398 9.16667 15C9.16667 15.4602 9.53976 15.8333 10 15.8333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div className={styles.conversationMessages}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${message.sender === 'me' ? styles.messageRowSent : styles.messageRowReceived}`}
                >
                  <div className={styles.messageBubble}>
                    <p className={styles.messageText}>{message.text}</p>
                    <span className={styles.messageTime}>{message.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.composer}>
              <button type="button" className={styles.iconButton} aria-label="Attach file">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59718 21.9983 8.005 21.9983C6.41282 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00171 17.5872 2.00171 15.995C2.00171 14.4028 2.63416 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80944 14.7186 1.38778 15.78 1.38778C16.8414 1.38778 17.8594 1.80944 18.61 2.56C19.3606 3.31056 19.7822 4.32863 19.7822 5.39C19.7822 6.45137 19.3606 7.46944 18.61 8.22L9.41 17.41C9.03482 17.7852 8.53122 17.9961 8.005 17.9961C7.47878 17.9961 6.97518 17.7852 6.6 17.41C6.22482 17.0348 6.01389 16.5312 6.01389 16.005C6.01389 15.4788 6.22482 14.9752 6.6 14.6L15.07 6.13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <input
                type="text"
                className={styles.composerInput}
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <button type="button" className={styles.sendButton} onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.contentCard}>
            <div className={styles.emptyState}>
              <Image
                src="/chat.svg"
                alt="Chat illustration"
                width={220}
                height={180}
                className={styles.emptyIllustration}
              />
              <h2 className={styles.emptyTitle}>Conversations Await</h2>
              <p className={styles.emptySubtitle}>Tap to connect and chat with real people, anytime.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
