import type { Job } from '../types/job'

type JobCardProp = {
    job: Job;
}

function formatDate(date: string | null) {
    let dateStr = new Date();
    if (date !== null) {
      dateStr = new Date(date);
    }

    return dateStr.toUTCString();
  }

function JobCard({ job }: JobCardProp) {
    return (
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

            {formatDate(job.postedDate)}
        </div>
    )
}

export default JobCard;