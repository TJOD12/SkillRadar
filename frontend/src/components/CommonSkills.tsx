import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Treemap } from "recharts";
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
                <Treemap
                    style={{ width: '100%', maxWidth: '550px', maxHeight: '8vh', aspectRatio: 4 / 3, stroke: PRIMARYBORDER, strokeWidth: 1.1   }}
                    data={barchartInit}
                    dataKey="count"
                    nameKey="skill"
                    aspectRatio={4 / 3}
                    nodeGap={5}
                    >
                    <Tooltip cursor={true}/>
                    <Legend />
                </Treemap>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonSkills;