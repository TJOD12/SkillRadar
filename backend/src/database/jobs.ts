import type { JobListing } from "../types.js"
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

export async function saveJobs(jobList: JobListing[]) {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env.DATABASE_URL!,
        }),
    });

    for (const job of jobList) {
        console.log(`Inserting: ${job.title}`); 

        if (!job.title || !job.company || !job.city || !job.url) {
            console.log(`Skipping job because required data is missing:`, job);
            continue;
        }

        await prisma.jobPosting.upsert({
        where: {
            url: job.url!
        },
        update: {
            title: job.title,
            company: job.company,
            city: job.city,
            description: job.description,
            postedDate: job.postedDate,
            jobSkills: job.skills
        },
        create: {
            title: job.title,
            company: job.company,
            city: job.city,
            description: job.description,
            url: job.url!,
            postedDate: job.postedDate,
            jobSkills: job.skills
        }
    });
    }
    await prisma.$disconnect();
}