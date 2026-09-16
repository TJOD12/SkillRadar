import express from "express"
import cors from "cors"
import jobsRouter from "./routes/jobs.js"
import filterRouter from "./routes/filter.js"
import { main } from "./scraper/main.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.use("/api/jobs", jobsRouter);

app.use("/api/filter", filterRouter);

app.post("/api/scrape", async (req, res) => {
    try {
        await main();

        res.json({
            status: "ok",
            message: "Scraping completed"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Scraping failed"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});