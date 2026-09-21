import { useEffect, useState } from 'react'
import { getJobs } from '../services/api'
import type { Job } from '../types/job'

import '../App.css'

function Metrics() {
    //const [jobs, setJobs] = useState<Job[]>([])

    // useEffect(() => {
    //     async function loadJobs() {
    //         try {
    //            const data = await getJobs();
    //            setJobs(data);
    //            parseMetrics(jobs);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })

    // function parseMetrics(jobs: Job[]) {
        
    // }

    return (
        <div>Hello</div>
    )
}

export default Metrics