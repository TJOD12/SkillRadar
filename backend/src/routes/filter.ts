import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const router = Router();

router.get("/city/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const jobs = await getJobsByCity(city);

        res.json(jobs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch jobs"
        });
    }
});

export async function getJobsByCity(city: string) {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env.DATABASE_URL!,
        }),
    });
    return prisma.jobPosting.findMany({
        where: {
            city: city
        },
        orderBy: {
            postedDate: "desc"
        }
    });
}

router.get("/skill/:skill", async (req, res) => {
    try {
        const skill = req.params.skill;
        const jobs = await getJobsBySkill(skill);

        res.json(jobs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch jobs"
        });
    }
});

export async function getJobsBySkill(skill: string) {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env.DATABASE_URL!,
        }),
    });
    return prisma.jobPosting.findMany({
        where: {
            jobSkills: {
                has: skill
            }
        },
        orderBy: {
            postedDate: "desc"
        }
    });
}

export default router;