import { useEffect, useState, type SetStateAction } from 'react'
import { getJobs } from '../services/api'
import type { Job } from '../types/job'

import '../App.css'

function Metrics() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
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
        console.log("parsing")
        try {
            for (let job of jobs) {
                console.log(job.jobSkills)
                for (let skill of job.jobSkills) {
                    skillsMetricList.push(skill)
                }
            }
            setSkills(skillsMetricList);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main>
            Hello
            { skills }
        </main>
    )
}

export default Metrics