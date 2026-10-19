import type { ChangeEvent } from "react";

type JobCardSkillProp = {
    skill: string;
    onSkillClick: (skill: string) => void;
}

function JobCardSkill({ skill, onSkillClick }: JobCardSkillProp) {
    return (
        <div onMouseEnter={() => console.log('Mouse entered')} className="skill-component" onClick={() => onSkillClick(skill)}>
            {skill}
        </div>
    )
}

export default JobCardSkill;