import { useEffect, useState, type SetStateAction } from 'react'
import { getJobs } from '../services/api'
import type { Job } from '../types/job'
import CommonSkills from '../components/CommonSkills'
import CommonCities from '../components/CommonCities'
import CommonExperience from '../components/CommonExperience'
import CommonEmployer from '../components/CommonEmployer'
import KpiCard from '../components/KPICardMetric'

import '../App.css'

function Metrics() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [skills, setSkills] = useState<Map<string, number>>(new Map());
    const [cities, setCities] = useState<Map<string, number>>(new Map());
    const [experiences, setExperiences] = useState<Map<string, number>>(new Map());
    const [employers, setEmployers] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadJobs() {
            try {
               const data = await getJobs();
               setJobs(data);
               parseMetrics(data);
            } catch (error) {
                console.log(error)
            }
        }
        loadJobs()
    }, [])

    function parseMetrics(jobs: Job[]) {
        let skillsMetricList: string[] = [];
        let citiesMetricsList: string[] = [];
        let experienceMetricsList: string[] = [];
        let employersMetricsList: string[] = [];
        console.log("parsing")
        try {
            for (let job of jobs) {
                for (let skill of job.jobSkills) {
                    skillsMetricList.push(skill)
                }
                citiesMetricsList.push(job.city);
                experienceMetricsList.push(job.experienceYears);
                employersMetricsList.push(job.company);
            }
            aggregateSkills(skillsMetricList);
            aggregateCities(citiesMetricsList);
            aggregateExperience(experienceMetricsList);
            aggregateEmployers(employersMetricsList);
        } catch (e) {
            console.log(e)
        }
    }

    function aggregateSkills(skills: string[]) {
        console.log("starting aggregation...")
        let skillsCounter = new Map<string, number>();
        let setUnique = new Set<string>();
        for (let skill of skills) {
            setUnique.add(skill);
        }

        for (let uniqueSkill of setUnique) {
            let counter = 0;
            for (let anySkill of skills) {
                if (anySkill === uniqueSkill) {
                    counter +=1;
                    skillsCounter.set(uniqueSkill, counter);
                }
            }
        }
        setSkills(skillsCounter);
        console.log(skillsCounter);
    }

    function aggregateCities(cities: string[]) {
        let citiesCounter = new Map<string, number>();
        let setUnique = new Set<string>();
        for (let city of cities) {
            setUnique.add(city);
        }

        for (let uniqueCity of setUnique) {
            let counter = 0;
            for (let anyCity of cities) {
                if (anyCity === uniqueCity) {
                    counter +=1;
                    citiesCounter.set(uniqueCity, counter);
                }
            }
        }
        setCities(citiesCounter);
        console.log(citiesCounter);
    }

    function aggregateExperience(experiences: string[]) {
        let experienceCounter = new Map<string, number>();
        let setUnique = new Set<string>();
        for (let experience of experiences) {
            if (experience !== null) {
                setUnique.add(experience.substring(20));
            }
        }

        for (let uniqueExperience of setUnique) {
            let counter = 0;
            for (let anyExperience of experiences) {
                if (anyExperience !== null) {
                    if (anyExperience.substring(20) === uniqueExperience) {
                        counter +=1;
                        experienceCounter.set(uniqueExperience, counter);
                    }
                }
            }
        }
        setExperiences(experienceCounter);
        console.log(experienceCounter);
    }

    function aggregateEmployers(employers: string[]) {
        let employersCounter = new Map<string, number>();
        let setUnique = new Set<string>();
        for (let employer of employers) {
            setUnique.add(employer);
        }

        for (let uniqueEmployer of setUnique) {
            let counter = 0;
            for (let anyEmployer of employers) {
                if (anyEmployer === uniqueEmployer) {
                    counter +=1;
                    employersCounter.set(uniqueEmployer, counter);
                }
            }
        }
        setEmployers(employersCounter);
        console.log(employersCounter);
    }

    function getTopMetrics(metricMap: Map<string, number>) {
        let metricName = "";
        const highest = Math.max(...metricMap.values(), 0);
        for (const [key, val] of metricMap.entries()) {
            if (val === highest) {
                metricName = key;
            }
        }
        return { "metric": metricName, "value": highest }
    }

    return (
        <main className='metrics-main'>
            <section>
                <h1>Metrics Dashboard</h1>
            </section>
            <section className='metrics-kpi-cards'>
                <KpiCard title="Top Skill:" data={getTopMetrics(skills)}></KpiCard>
                <KpiCard title="Top City:" data={getTopMetrics(cities)}></KpiCard>
                <KpiCard title="Top Experience:" data={getTopMetrics(experiences)}></KpiCard>
                <KpiCard title="Top Employer:" data={getTopMetrics(employers)}></KpiCard>
            </section>
            <section>
                <div className='metrics-grid'>
                    <div className='metrics-element'>
                        <h2>Most common experience required (years)</h2>
                        <CommonExperience experienceList={experiences}></CommonExperience>
                    </div>
                    <div className='metrics-element'>
                        <h2>Most common cities</h2>
                        <CommonCities citiesList={cities}></CommonCities>
                    </div>
                    <div className='metrics-element'>
                        <h2>Most common skills scraped online</h2>
                        <CommonSkills skillsList={skills}></CommonSkills>
                    </div>
                    <div className='metrics-element'>
                        <h2>Most common employers</h2>
                        <CommonEmployer employersList={employers}></CommonEmployer>
                    </div>
                </div>
            </section>
            {/* { skills } */}
        </main>
    )
}

export default Metrics