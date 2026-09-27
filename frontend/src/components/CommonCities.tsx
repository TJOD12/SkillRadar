import { useEffect } from 'react';
import { Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import type { TooltipIndex } from 'recharts';

type CommonCitiesprops = {
    citiesList: Map<string, number>;
}

function CommonCities({ citiesList }: CommonCitiesprops) {
    const piechartInit = Array.from(citiesList).map(([city, count]) => ({
        city, count
    }));
    return (
        <div className="common-city-container">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={piechartInit}
                    nameKey="city"
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    stroke="white"
                />
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonCities;