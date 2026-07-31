import express from 'express';
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';

const app = express();
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
