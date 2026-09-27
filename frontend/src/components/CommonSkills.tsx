import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { PRIMARYBLUE, PRIMARYBORDER } from '../utils/colors.ts';

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
                    <Tooltip cursor={true}/>
                    <Legend />
                    <Bar dataKey="count" fill={PRIMARYBLUE} stroke={PRIMARYBORDER}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonSkills;