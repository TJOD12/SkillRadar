import type { Page } from "playwright";
import type { JobListing } from "../types.js"

export async function parseContent(page: Page): Promise<JobListing[]> {
    console.log("Page title:", await page.title());
    // wait 10 secodns before checking the body text
    await page.waitForTimeout(10000);
    const pageText = await page.locator("body").innerText();

    // Manually perform the captcha within 30 seconds
    if (pageText.includes("¿Eres humano o un robot?")) {
       console.log("yes")
       await page.waitForTimeout(22000);
    }
    const jobs = page.locator("li.ij-OfferList-offerCardItem");

    let previousCount = 0;
    while (true) {
        const currentCount = await jobs.count();

        console.log("Current cards:", currentCount);

        // Break when no new cards were loaded
        if (currentCount === previousCount) {
            break;
        }
        previousCount = currentCount;

        // Scroll the last loaded card into view and wait
        await jobs.last().scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
    } 

    const count = await jobs.count();
    console.log("Total cards count..", count);

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
        console.log(title);

        const company = await validateElementData(job.locator(".ij-OfferCardContent-description-subtitle-link"));
        const city = await validateElementData(job.locator(".ij-OfferCardContent-description-list-item-truncate"));
        const description = await validateElementData(job.locator(".ij-OfferCardContent-description-description.ij-OfferCardContent-description-description--hideOnMobile"));
        const url = await job.locator(".ij-OfferCardContent-description-link.sui-PrimitiveLinkBoxLink").getAttribute("href");
        const postedDate = await validateElementData(job.locator('[data-testid="sincedate-tag"]'));

        let jobListing: JobListing = { title: title,  company: company, city: city, description: description, url: url, postedDate: postedDate, skills: [] }
        jobList.push(jobListing);
    }
    //console.log("jobList:", jobList)
    return jobList;
}

// Assign null if the class isn't found to avoid hanging the scraper
async function validateElementData(locator: ReturnType<Page["locator"]>) {
    if (await locator.count() === 0) {
        return null;
    }

    return await locator.textContent();
}

export function parsePostedDate(dateText: string | null): string | null {
    if (!dateText) {
        return null;
    }

    const text = dateText.trim().toLowerCase();
    const now = new Date();

    // "Hace 12h" 
    const hoursAgo = text.match(/hace\s+(\d+)\s*h/);

    if (hoursAgo) {
        const hours = Number(hoursAgo[1]);

        const date = new Date(
            now.getTime() - hours * 60 * 60 * 1000
        );
        const dateString: string = date.toISOString();
        return dateString;
    }

    // "Hace 6d"
    const daysAgo = text.match(/hace\s+(\d+)\s*d/);

    if (daysAgo) {
        const days = Number(daysAgo[1]);

        const date = new Date(
            now.getTime() - days * 24 * 60 * 60 * 1000
        );
        const dateString: string = date.toISOString();
        return dateString;
    }

    // "21 ago"
    const absoluteDate = text.match(/(\d{1,2})\s+([a-záéíóú]+)/);

    if (absoluteDate) {
        const day = Number(absoluteDate[1]);
        const monthName = String(absoluteDate[2]);

        const months: Record<string, number> = {
            ene: 0,
            enero: 0,
            feb: 1,
            febrero: 1,
            mar: 2,
            marzo: 2,
            abr: 3,
            abril: 3,
            may: 4,
            mayo: 4,
            jun: 5,
            junio: 5,
            jul: 6,
            julio: 6,
            ago: 7,
            agosto: 7,
            sep: 8,
            sept: 8,
            septiembre: 8,
            oct: 9,
            octubre: 9,
            nov: 10,
            noviembre: 10,
            dic: 11,
            diciembre: 11,
        };

        const month = months[monthName];
        if (month !== undefined) {
            const date = new Date(now.getFullYear(), month, day);
            const dateString: string = date.toISOString();
            return dateString;
        }
    }
    console.warn(`Could not parse posted date: "${dateText}"`);

    return null;
}