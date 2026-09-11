export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  description: string | null;
  experienceYears: number | null;
  applicantCount: number | null;
  postedDate: string | null;
  scrapedAt: string;
}
