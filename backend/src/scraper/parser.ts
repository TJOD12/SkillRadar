import { type Page } from "playwright";
import type { JobListing } from "../types.js"

export async function parseContent(page: Page): Promise<JobListing[]> {
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