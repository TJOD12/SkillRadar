const API_URL = "http://localhost:3000/api"

export async function getJobs() {
    const response = await fetch(`${API_URL}/jobs`);

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
}

export async function triggerAdminScrape() {
    const response = await fetch(`${API_URL}/scrape`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
}

export async function filterCities(city: string) {

    const response = await fetch(`${API_URL}/filter/city/${encodeURIComponent(city)}`);
    if (!response.ok) {
        throw new Error("Failed to filter");
    }

    return response.json();
}