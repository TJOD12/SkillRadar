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