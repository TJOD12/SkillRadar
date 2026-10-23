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
   
    await page.waitForTimeout(2000);
    await page.mouse.wheel(0, 500)

    const jobs = page.locator("li.ij-OfferList-offerCardItem");

    let previousCount = 0;
    let currentCount = await jobs.count();

    // While more jobs are still being loaded into teh DOM
    while (currentCount > previousCount) {
        previousCount = currentCount;

        await page.mouse.wheel(0, 700);
        await page.waitForTimeout(1500);

        currentCount = await jobs.count();

        console.log(`Loaded cards: ${currentCount}`);
    }

    // Get the content
    const jobsListData = await jobs.evaluateAll(function (cards) {
        return cards.map(function (card) {
            const titleLocator = card.querySelector<HTMLAnchorElement>(".ij-OfferCardContent-description-link");

            return {
                title: titleLocator?.textContent?.trim() ?? null,
                company: card.querySelector(".ij-OfferCardContent-description-subtitle-link")?.textContent?.trim() ?? null,
                city: card.querySelector(".ij-OfferCardContent-description-list-item-truncate")?.textContent?.trim() ?? null,
                description: card.querySelector(".ij-OfferCardContent-description-description.ij-OfferCardContent-description-description--hideOnMobile")?.textContent?.trim() ?? null,
                experience: "",
                url: titleLocator?.href ?? null,
                postedDate: card.querySelector('[data-testid="sincedate-tag"]')?.textContent?.trim() ?? null,
            };
        });
    });
    console.log("DOM card count:", await jobs.count());
    console.log("Scraped card count:", jobsListData.length);

     // List that will contain the JobListing objects
    let jobList: JobListing[] = [];

    for (let i = 0; i < jobsListData.length; i++) {
        let jobListing: JobListing = { title: "",  company: "", city: "", description: "", experienceYears: "", url: "", postedDate: "", skills: [] }
        const job = jobsListData[i];

        // console.log(`${i + 1}: ${JSON.stringify(job)}}`)

        // Validate each entry
        if (job?.title) {
            jobListing.title = job.title;
        } else {
            console.log(`Skipping job ${i + 1}: missing title`);
            continue;
        }

        if (job?.company) {
            jobListing.company = job.company;
        } else {
            console.log(`Skipping job ${i + 1}: missing company name`);
            continue;
        }

        if (job?.city) {
            jobListing.city = job.city;
        } else {
            console.log(`Skipping job ${i + 1}: missing city`);
            continue;
        }

        if (job?.description) {
            jobListing.description = job.description;
        } else {
            console.log(`Skipping job ${i + 1}: missing description`);
            continue;
        }

        if (job?.url) {
            jobListing.url = job.url;

            // Click on the job url to expand the card details
            await page.goto(job.url, {
                waitUntil: "domcontentloaded",
                timeout: 30000
            });

            const experienceNeeded = page.locator("p").filter({
                hasText: "Experiencia mínima:"
            });
            
            let experience = await experienceNeeded.first().textContent();
            if (experience) {
                job.experience = experience;
            }
        } else {
            console.log(`Skipping job ${i + 1}: missing url`);
            continue;
        }

        if (job?.postedDate) {
            jobListing.postedDate = job.postedDate;
        }
        
        jobList.push(jobListing);
    }

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