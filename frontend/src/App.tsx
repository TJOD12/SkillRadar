import { Routes, Route, NavLink } from "react-router-dom";
import { lazy, Suspense } from 'react';
import './App.css'

const Jobs = lazy(() => import("./pages/Jobs"))
const Metrics = lazy(() => import("./pages/Metrics"))

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1>SkillRadar</h1>
      </header>
      <div className="main-layout">
        <nav>
          <NavLink to="/" className={ ({ isActive }) => isActive ? "link-selected" : "navlinks" }>Jobs</NavLink>
          <NavLink to="/metrics" className={ ({ isActive }) => isActive  ? "link-selected" : "navlinks" }>Metrics</NavLink>
        </nav>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
