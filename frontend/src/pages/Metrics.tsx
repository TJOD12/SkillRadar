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
                for (let skill of job.jobSkills) {
                    skillsMetricList.push(skill)
                }
            }
            aggregateSkills(skillsMetricList);
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
        //setSkills();
        console.log(skillsCounter)
    }

    return (
        <main>
            <section>
                Customer dashboard
            </section>
            <section>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </section>
            { skills }
        </main>
    )
}

export default Metrics