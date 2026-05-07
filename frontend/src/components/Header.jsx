import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📄</span>
          <h1>ResumeBot</h1>
        </Link>
        <p className="header-subtitle">UMass Amherst AI Resume Reviewer</p>
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
          >
            History
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
