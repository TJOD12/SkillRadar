import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const jobs = await getJobs();

        res.json(jobs);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to fetch jobs"
        });
    }
});

export async function getJobs() {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env.DATABASE_URL!,
        }),
    });
    return prisma.jobPosting.findMany({
        orderBy: {
            scrapedAt: "desc"
        }
    });
}

export default router;