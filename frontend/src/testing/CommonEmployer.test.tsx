import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommonEmployer from '../components/CommonEmployer'

describe('CommonEmployer', () => {
    it('should render the component', () => {
        const employers = new Map<string, number>();

        render(<CommonEmployer employersList={employers}/>)

        expect(
            document.querySelector('.common-city-container')
        ).toBeInTheDocument();
    })

    it('should display the correct employers names', () => {

        const employers = new Map<string, number>([
            ['Tom', 12],
            ['Dick', 8],
            ['Harry', 5]
        ]);

        render(<CommonEmployer employersList={employers} />);

        expect(screen.getByText('Tom: 12,')).toBeInTheDocument();
        expect(screen.getByText('Dick: 8,')).toBeInTheDocument();
        expect(screen.getByText('Harry: 5,')).toBeInTheDocument();

    });
})