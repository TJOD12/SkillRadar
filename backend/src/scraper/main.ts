import { chromium, type BrowserContext, type Page } from "playwright";
import type { JobListing } from "../types.js"
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
    console.log("Scraping...");

    const browser = await launchChrome()
    console.log("Bowser launched...");

    let page = await browser.newPage();
    console.log("Awaiting page load...");
    console.log(await page.title());
    // await page.goto("https://ie.indeed.com/jobs?q=software+engineer&l=Dublin");
    await page.goto("https://www.infojobs.net/ofertas-trabajo/software-developer");
    console.log("Awaiting pahe load...");
    const jobList = await parseContent(page);

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
            postedDate: job.postedDate
        },
        create: {
            title: job.title,
            company: job.company,
            city: job.city,
            description: job.description,
            url: job.url!,
            postedDate: job.postedDate
        }
    });
    }

    await browser.close();
}

async function launchChrome() {
    let browser = await chromium.launch({
        headless: false
    });

    return browser;
}

async function parseContent(page: Page): Promise<JobListing[]> {
    const jobs = page.locator("li.ij-OfferList-offerCardItem");
    const count = await jobs.count();
    console.log("Count..", count);

    // Don't parse content if no content was found on the page
    if (count === 0) {
        return [];
    }

    // List that will contain the JobListing objects
    let jobList: JobListing[] = [];

    for (let i = 0; i < count; i++) {
        const job = jobs.nth(i);

        // Skip advert cards
        const titleLocator = job.locator(".ij-OfferCardContent-description-link");
        if (await titleLocator.count() === 0) {
            console.log(`Skipping card ${i} - no title`);
            continue;
        }
        const title = await titleLocator.textContent()

        const company = await validateElementData(job.locator(".ij-OfferCardContent-description-subtitle-link"));
        const city = await validateElementData(job.locator(".ij-OfferCardContent-description-list-item-truncate"));
        const description = await validateElementData(job.locator(".ij-OfferCardContent-description-description.ij-OfferCardContent-description-description--hideOnMobile"));
        const url = await job.locator(".ij-OfferCardContent-description-link.sui-PrimitiveLinkBoxLink").getAttribute("href");
        const postedDate = await validateElementData(job.locator('[data-testid="sincedate-tag"]'));

        let jobListing: JobListing = { title: title,  company: company, city: city, description: description, url: url, postedDate: postedDate }
        jobList.push(jobListing);
    }

    console.log("jobList:", jobList)
    return jobList;
}

// Assign null if the class isn't found to avoid hanging the scraper
async function validateElementData(locator: ReturnType<Page["locator"]>) {
    if (await locator.count() === 0) {
        return null;
    }

    return await locator.textContent();
}

main().catch(console.error);