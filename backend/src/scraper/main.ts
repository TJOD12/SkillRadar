import { chromium, type BrowserContext, type Page } from "playwright";

async function main() {
    console.log("Scraping...");

    const browser = await launchChrome()
    console.log("Bowser launched...");

    const page = await browser.newPage();
    console.log("Awaiting pahe load...");
    console.log(await page.title());
    // await page.goto("https://ie.indeed.com/jobs?q=software+engineer&l=Dublin");
    await page.goto("https://www.infojobs.net/ofertas-trabajo/software-developer");
    console.log("Awaiting pahe load...");
    await parseContent(page);

    await browser.close();
}

async function launchChrome() {
    const browser = await chromium.launch({
        headless: false
    });

    return browser;
}

async function parseContent(page: Page) {
    //const jobs = page.locator(".ij-List.ij-List--vertical.ij-List--spaced.ij-OfferList > li");
    console.log("All li:", await page.locator("li").count());
    const jobs = page.locator("li.ij-List-item.ij-OfferList-offerCardItem.sui-PrimitiveLinkBox");
    console.log("Jobs...", jobs);
    const count = await jobs.count();
    console.log("Count..", count);

    for (let i = 0; i < count; i++) {
        const job = jobs.nth(i);

        const title = await job.locator(".ij-OfferCardContent-description-link.sui-PrimitiveLinkBoxLink").textContent();
        const company = await job.locator(".ij-OfferCardContent-description-subtitle-link.sui-PrimitiveLinkBoxRaised").textContent();
        const county = await job.locator(".ij-OfferCardContent-description-list-item-truncate").textContent();

        console.log("-----",title, company, county, "-----");
    }
}

main().catch(console.error);