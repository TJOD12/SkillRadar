import { chromium, type BrowserContext, type Page } from "playwright";
import type { JobListing } from "../types.js"
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import { parseContent } from "./parser.js"
import { parseSkills } from "../skills/parser.js"
import { saveJobs } from "../database/jobs.js";
import "dotenv/config";

async function main() {
    console.log("Scraping...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    const browser = await launchChrome()
    console.log("Bowser launched...");

    let page = await browser.newPage();
    console.log("Awaiting page load...");
    console.log(await page.title());
    // await page.goto("https://ie.indeed.com/jobs?q=software+engineer&l=Dublin");
    await page.goto("https://www.infojobs.net/ofertas-trabajo/software-developer");
    console.log("Awaiting pahe load...");
    const jobList = await parseContent(page);

    for (const job of jobList) {
        job.skills = await parseSkills(job.description);
    }

    saveJobs(jobList);
    
    await browser.close();
}

async function launchChrome() {
    let browser = await chromium.launch({
        headless: false
    });

    return browser;
}

main().catch(console.error);