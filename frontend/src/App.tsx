import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1>SkillRadar</h1>

        <nav>
          <a href="#">Jobs</a>
          <a href="#">Skills</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Discover the skills companies are looking for</h2>

          <p>
            Explore software development jobs and see which technologies and
            skills are most in demand.
          </p>
        </section>

        <section className="filters">
          <select>
            <option value="">All cities</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
          </select>

          <input
            type="text"
            placeholder="Search jobs..."
          />
        </section>

        <section className="jobs">
          <h2>Recent jobs</h2>

          <div className="job-card">
            <h3>Software Engineer</h3>
            <p>Example Company · Madrid</p>

            <div className="skills">
              <span>TypeScript</span>
              <span>React</span>
              <span>PostgreSQL</span>
              <span>Docker</span>
            </div>
          </div>

          <div className="job-card">
            <h3>Backend Developer</h3>
            <p>Another Company · Barcelona</p>

            <div className="skills">
              <span>Python</span>
              <span>FastAPI</span>
              <span>PostgreSQL</span>
              <span>AWS</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
