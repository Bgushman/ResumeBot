import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<div>Frontend scaffold</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
