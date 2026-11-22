import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommonExperience from '../components/CommonExperience'

describe('CommonExperience', () => {
    it('should render the component', () => {
        const experiences = new Map<string, number>();

        render(<CommonExperience experienceList={experiences}/>)

        expect(
            document.querySelector('.common-skills-container')
        ).toBeInTheDocument();
    })

    it('should display correct key categories', () => {
        const experience = new Map<string, number>([
            ['Al menos 2 años', 15],
            ['Al menos 3 años', 25],
            ['Al menos 4 años', 10]
        ]);

        render(<CommonExperience experienceList={experience} />);

        expect(screen.getByText('Al menos 2 años')).toBeInTheDocument();
        expect(screen.getByText('Al menos 3 años')).toBeInTheDocument();
        expect(screen.getByText('Al menos 4 años')).toBeInTheDocument();
    });
})