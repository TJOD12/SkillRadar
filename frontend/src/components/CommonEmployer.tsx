import { useEffect } from 'react';
import { Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import type { TooltipIndex } from 'recharts';
import { PRIMARYBLUE, PRIMARYBORDER } from '../utils/colors.ts';

type CommonEmployerprops = {
    employersList: Map<string, number>;
}

function CommonEmployer({ employersList }: CommonEmployerprops) {
    const piechartInit = Array.from(employersList).map(([employer, count]) => ({
        employer, count
    }));
    console.log(piechartInit)
    return (
        <div className="common-city-container">
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                <Pie
                    data={piechartInit}
                    nameKey="employer"
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill={PRIMARYBLUE}
                    stroke={PRIMARYBORDER}
                />
                <Tooltip cursor={true}/>
                </PieChart>
            </ResponsiveContainer>
            <div className='pie-city-list'>
                {piechartInit.map((employerData) => (
                    <p>{employerData.employer}: {employerData.count},</p>
                ))}
            </div>
        </div>
    )
}

export default CommonEmployer;