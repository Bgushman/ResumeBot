import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MajorSelector from '../components/MajorSelector'
import ResumeUpload from '../components/ResumeUpload'
import { uploadResume } from '../services/api'

function HomePage() {
  const [major, setMajor] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!major) {
      setError('Please select your major.')
      return
    }
    if (!file) {
      setError('Please upload your resume PDF.')
      return
    }

    setLoading(true)
    try {
      const data = await uploadResume(file, major)
      navigate(`/chat/${data.session_id}`)
    } catch (err) {
      const message =
        err.response?.data?.detail || 'Upload failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Get AI-Powered Resume Feedback</h2>
        <p>
          Upload your resume and receive personalized, major-specific feedback
          from our AI career advisor.
        </p>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <MajorSelector value={major} onChange={setMajor} />
        <ResumeUpload file={file} onFileSelect={setFile} />

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner"></span> Analyzing Resume...
            </span>
          ) : (
            'Get Resume Review'
          )}
        </button>
      </form>
    </div>
  )
}

export default HomePage
