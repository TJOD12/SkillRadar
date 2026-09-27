import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";

type CommonSkillsprops = {
    skillsList: Map<string, number>;
}

function CommonSkills({ skillsList }: CommonSkillsprops) {
    const barchartInit = Array.from(skillsList).map(([skill, count]) => ({
        skill, count
    }));
    return (
        <div className="common-skills-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barchartInit}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3B82F6" stroke='#FFF'/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonSkills;