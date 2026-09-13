import { useEffect, useState } from 'react'
import { getJobs, triggerAdminScrape } from './services/api'
import type { Job } from './types/job'

import './App.css'

function App() {
  // Essentially these are getters and setters
  // The left variable is accessed in the ui
  // UseState defines the initial type and value
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UseEffect runs when this component loads
  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs()
        setJobs(data)
      } catch (error) {
        setError('Failed to load jobs')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

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
          <button onClick={triggerAdminScrape}>
            Scrape jobs
          </button>
        </section>

        <section className="jobs">
          <h2>Recent jobs</h2>

          {loading && <p>Loading jobs...</p>}

          {error && <p>{error}</p>}

          {!loading &&
            !error &&
            jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>

                <p>
                  {job.company} · &#128205;{job.city}
                </p>

                <p>
                  {job.jobSkills.map((skill) => (
                    <span className='job-card-skill'>{skill}</span>
                  ))}
                </p>

                {job.postedDate && (
                  <p>Posted: {job.postedDate}</p>
                )}
              </div>
            ))}
        </section>
      </main>
    </div>
  )
}

export default App
