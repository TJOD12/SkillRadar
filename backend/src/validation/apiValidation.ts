export async function cityValidation(city: string) {
    const acceptedCities = ["Madrid", "Valencia", "Barcelona"]
    if (acceptedCities.includes(city)) {
        return true;
    }
    return false;
}

export async function skillValidation(skill: string) {
    if ((skill.trim().length <= 32) && (skill.trim().length > 0)) {
        const happyPattern: RegExp = /^[a-zA-Z]+$/
        return happyPattern.test(skill) 
    } else {
        return false;
    } 
}

export async function dateValidation(date: string) {
    const acceptedDates = ["desc", "asc"]
    if (acceptedDates.includes(date)) {
        return true;
    }
    return false;
}