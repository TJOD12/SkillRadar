import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommonSkills from '../components/CommonSkills'
import { getHighestValue } from '../components/CommonSkills'

describe('CommonSkills', () => {
    it('should render the component', () => {
        const skills = new Map<string, number>();

        render(<CommonSkills skillsList={skills}/>)

        expect(
            document.querySelector('.common-skills-container')
        ).toBeInTheDocument();
    })

    it('should get the highest value in the list', () => {
        const skills = new Map<string, number>([
            ['Python', 35],
            ['Git', 18],
            ['Java', 15],
            ['Azure', 12],
            ['Node', 21]
        ]);
        
        expect(getHighestValue(skills)).toBe(35)
    });

    it('should display the correct skills', () => {
        const skills = new Map<string, number>([
            ['Python', 35],
            ['Git', 18],
            ['Java', 15],
            ['Azure', 12],
            ['Node', 21]
        ]);

        render(<CommonSkills skillsList={skills}/>)

        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('Git')).toBeInTheDocument();
        expect(screen.getByText('Java')).toBeInTheDocument();
        expect(screen.getByText('Azure')).toBeInTheDocument();
        expect(screen.getByText('Node')).toBeInTheDocument();
    });
})