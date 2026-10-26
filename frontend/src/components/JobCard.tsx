import type { Job } from '../types/job'
import JobCardSkill from '../components/JobCard-Skill'

type JobCardProp = {
    job: Job;
    onSkillClick: (skill: string) => void;
}

function formatDate(date: string | null) {
    let dateStr = new Date();
    if (date !== null) {
      dateStr = new Date(date);
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        dateStyle: 'full'
    };

    return dateStr.toLocaleDateString("en-GB", dateOptions);
  }

function displayExperience(exp: string) {
    if (exp !== null) {
        return <span>· {exp}</span>
    }
}

function JobCard({ job, onSkillClick }: JobCardProp) {
    return (
        <div className="job-card" key={job.id}>
        <h3 className='job-card-title'>{job.title}</h3>

        <p>
            {job.company} · &#128205;{job.city} {displayExperience(job.experienceYears)}
        </p>

        <p>
            {formatDate(job.postedDate)}
        </p>

            <div>
                {job.jobSkills.map((skill) => (
                    <JobCardSkill key={skill} skill={skill} onSkillClick={onSkillClick}></JobCardSkill>
                ))}
            </div>
        </div>
    )
}

export default JobCard;