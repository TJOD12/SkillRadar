import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { PRIMARYBLUE, PRIMARYBORDER } from '../utils/colors.ts';

type CommonSkillsprops = {
    skillsList: Map<string, number>;
}

const renderBoxes = (props:any) => {
    const { x, y, width, height, name, value } = props;
    const fontSize = Math.max(8,Math.min(18, Math.min(width / 5, height / 2)));
    const fillColour = (count: number) => {
        if (count > 15) {
            return 'rgb(0, 0, 133)'
        }
        if (10 < count && count <= 15) {
            return 'rgb(0, 0, 190)'
        }
        if (5 < count && count <= 10) {
            return 'rgb(58, 58, 236)'
        }
        if (count <= 5) {
            return 'rgb(102, 102, 248)'
        }
    }

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: fillColour(value),
                    stroke: PRIMARYBORDER,
                    strokeWidth: 2,
                }}
            />
            <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={PRIMARYBORDER}
                fontSize={fontSize}
            >
                {name}
            </text>
        </g>
    )
}

function CommonSkills({ skillsList }: CommonSkillsprops) {
    const barchartInit = Array.from(skillsList).map(([skill, count]) => ({
        skill, count
    }));
    return (
        <div className="common-skills-container">
            <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    style={{ width: '100%', maxWidth: '550px', maxHeight: '8vh', aspectRatio: 4 / 3  }}
                    data={barchartInit}
                    dataKey="count"
                    nameKey="skill"
                    aspectRatio={4 / 3}
                    nodeGap={5}
                    content={renderBoxes}
                    >
                    <Tooltip cursor={true}/>
                    <Legend />
                </Treemap>
            </ResponsiveContainer>
        </div>
    )
}

export default CommonSkills;