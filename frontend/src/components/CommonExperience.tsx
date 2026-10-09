import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { PRIMARYBLUE, PRIMARYBORDER } from '../utils/colors.ts';

type CommonExperienceprops = {
    experienceList: Map<string, number>;
}

function CommonExperience({ experienceList }: CommonExperienceprops) {
    const barchartInit = Array.from(experienceList).map(([year, count]) => ({
        year, count
    }));
    return (
        <div className="common-skills-container">
            <ResponsiveContainer width="95%" height="100%">
                <BarChart data={barchartInit}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip cursor={true}/>
                    <Legend />
                    <Bar dataKey="count" fill={PRIMARYBLUE} stroke={PRIMARYBORDER}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonExperience;