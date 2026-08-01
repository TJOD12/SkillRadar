import "dotenv/config";
import express from 'express';
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';

const app = express();
console.log("process.env.DATABASE_URL----->", process.env.DATABASE_URL);
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SkillRadar API is running');
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await prisma.jobPosting.findMany();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" })
  }
});

app.get('/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch skills" })
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
