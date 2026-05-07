import { useState, useEffect } from 'react'
import SessionList from '../components/SessionList'
import { getSessions, deleteSession } from '../services/api'

function HistoryPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  async function loadSessions() {
    try {
      const data = await getSessions()
      setSessions(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this session and all its messages?')) return
    try {
      await deleteSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } catch {
      // silently fail
    }
  }

  if (loading) {
    return (
      <div className="history-page">
        <h2>Review History</h2>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading sessions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-page">
      <h2>Review History</h2>
      <SessionList sessions={sessions} onDelete={handleDelete} />
    </div>
  )
}

export default HistoryPage
