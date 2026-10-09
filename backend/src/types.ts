export interface JobListing {
    title: string|null;
    company: string|null;
    city: string|null;
    description: string|null;
    experienceYears: string | null;
    url: string|null;
    postedDate: string|null;
    skills: string[];
}

export interface Skill {
    name: string;
    category: string;
}