import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CommonSkillsprops = {
    skillsList: Map<string, number>;
}

function CommonSkills({ skillsList }: CommonSkillsprops) {
    const barchartInit = Array.from(skillsList).map(([skill, count]) => ({
        skill, count
    }));
    return (
        <div className="common-skills-container">
            <BarChart width={600} height={400} data={barchartInit}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
            </BarChart>
        </div>
    )
}

export default CommonSkills;