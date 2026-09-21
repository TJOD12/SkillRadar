import { Routes, Route } from "react-router-dom";
import Metrics from "./pages/Metrics";
import Jobs from './pages/Jobs'

import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1>SkillRadar</h1>

        <nav>
          <a href="/">Jobs</a>
          <a href="/metrics">Metrics</a>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </div>
  )
}

export default App
