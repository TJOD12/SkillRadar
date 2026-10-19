import { Routes, Route, NavLink } from "react-router-dom";
import Metrics from "./pages/Metrics";
import Jobs from './pages/Jobs'
import { useState } from "react";

import './App.css'

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
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
