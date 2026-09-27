import { useEffect } from 'react';
import { Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import type { TooltipIndex } from 'recharts';
import { PRIMARYBLUE, PRIMARYBORDER } from '../utils/colors.ts';

type CommonCitiesprops = {
    citiesList: Map<string, number>;
}

function CommonCities({ citiesList }: CommonCitiesprops) {
    const piechartInit = Array.from(citiesList).map(([city, count]) => ({
        city, count
    }));
    console.log(piechartInit)
    return (
        <div className="common-city-container">
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                <Pie
                    data={piechartInit}
                    nameKey="city"
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill={PRIMARYBLUE}
                    stroke={PRIMARYBORDER}
                />
                <Tooltip cursor={true}/>
                </PieChart>
            </ResponsiveContainer>
            <div className='pie-city-list'>
                {piechartInit.map((cityData) => (
                    <p>{cityData.city}: {cityData.count},</p>
                ))}
            </div>
        </div>
    )
}

export default CommonCities;