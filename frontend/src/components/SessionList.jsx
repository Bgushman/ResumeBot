import { Link } from 'react-router-dom'

function SessionList({ sessions, onDelete }) {
  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <p>No review sessions yet.</p>
        <Link to="/" className="btn btn-primary">
          Upload a Resume
        </Link>
      </div>
    )
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <div key={session.id} className="session-card">
          <Link to={`/chat/${session.id}`} className="session-info">
            <h3>{session.resume_filename}</h3>
            <span className="session-major">{session.major}</span>
            <span className="session-date">
              {new Date(session.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(session.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default SessionList
