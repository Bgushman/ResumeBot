import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<div>Frontend scaffold</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
