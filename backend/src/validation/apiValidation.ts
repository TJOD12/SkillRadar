export async function cityValidation(city: string) {
    const acceptedCities = ["Madrid", "Valencia", "Barcelona"]
    if (acceptedCities.includes(city)) {
        return true;
    }
    return false;
}