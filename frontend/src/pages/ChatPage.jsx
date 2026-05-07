import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import { getSession } from '../services/api'

function ChatPage() {
  const { sessionId } = useParams()
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSession() {
      try {
        const data = await getSession(sessionId)
        setSession(data)
        setMessages(
          data.messages.map((m) => ({ role: m.role, content: m.content }))
        )
      } catch {
        setError('Failed to load session.')
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="chat-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="chat-page">
        <div className="error-state">
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <Link to="/" className="back-link">
          &larr; Back
        </Link>
        <div className="chat-session-info">
          <h2>{session.resume_filename}</h2>
          <span className="session-major">{session.major}</span>
        </div>
      </div>
      <ChatWindow
        sessionId={sessionId}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  )
}

export default ChatPage
