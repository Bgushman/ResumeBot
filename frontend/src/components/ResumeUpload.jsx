import { useState, useRef } from 'react'

function ResumeUpload({ file, onFileSelect }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  function handleDrag(e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0]
      if (dropped.type === 'application/pdf') {
        onFileSelect(dropped)
      }
    }
  }

  function handleChange(e) {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div className="resume-upload">
      <label>Upload Your Resume (PDF)</label>
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          hidden
        />
        {file ? (
          <div className="file-info">
            <span className="file-icon">✅</span>
            <span className="file-name">{file.name}</span>
            <span className="file-size">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">📁</span>
            <p>Drag & drop your resume PDF here</p>
            <p className="upload-hint">or click to browse</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeUpload
