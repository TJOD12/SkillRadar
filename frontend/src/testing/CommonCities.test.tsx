import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommonCities from '../components/CommonCities'

describe('CommonCities', () => {
    it('should render the component', () => {
        const cities = new Map<string, number>();

        render(<CommonCities citiesList={cities}/>)

        expect(
            document.querySelector('.common-city-container')
        ).toBeInTheDocument();
    })

    it('should display the correct city names', () => {

        const cities = new Map<string, number>([
            ['Madrid', 12],
            ['Barcelona', 8],
            ['Valencia', 5]
        ]);

        render(<CommonCities citiesList={cities} />);

        expect(screen.getByText('Madrid: 12,')).toBeInTheDocument();
        expect(screen.getByText('Barcelona: 8,')).toBeInTheDocument();
        expect(screen.getByText('Valencia: 5,')).toBeInTheDocument();

    });
})