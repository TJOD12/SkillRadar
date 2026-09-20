import { useEffect, useState, type ChangeEvent } from 'react'
import { getJobs, triggerAdminScrape, filterCities, filterSkills } from './services/api'
import JobCard from './components/JobCard'
import LoadingCard from './components/LoadingCard'
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

  // function passes the city selected in dropdown to the backend 
  // filter endpoint which then returns jobs from db that match city
  const handleCityChange = async (evt: ChangeEvent<HTMLSelectElement>) => {
      const city = evt.target.value;

      if (city === "") {
          setJobs(await getJobs());
          return;
      }

      const filteredJobs = await filterCities(city);

      setJobs(filteredJobs);
  };

  const handleSearchBar = async (evt: ChangeEvent<HTMLInputElement>) => {
    const searchText = evt.target.value;

    // Display the loading component
    setLoading(true);

    // Don't call the api if searchbar is empty
    if (searchText === "") {
      setJobs(await getJobs());
      return;
    }

    const filteredJobs = await filterSkills(searchText.trim());
    if (filteredJobs.length > 0) {
      setLoading(false);
    }
    setJobs(filteredJobs);
  };

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
          <select onChange={handleCityChange}>
            <option value="">All cities</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
          </select>

          <input
            type="text"
            placeholder="Search skills..."
            onChange={handleSearchBar}
          />
          <button onClick={triggerAdminScrape}>
            Scrape jobs
          </button>
        </section>

        <section className="jobs">
          <h2>Recent jobs</h2>

          {loading && <LoadingCard message={'Loading Jobs...'}></LoadingCard>}

          {error && <p>{error}</p>}

          {!loading &&
            !error &&
            jobs.map((job) => (
              <JobCard key={job.id} job={job}></JobCard>
            ))}
        </section>
      </main>
    </div>
  )
}

export default App
