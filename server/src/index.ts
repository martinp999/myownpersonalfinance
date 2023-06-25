import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routes/api.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));

app.use("/api", apiRouter);

const clientPath = path.join(__dirname, "..", "..", "client", "build");
app.use(express.static(clientPath));
app.use((req, res, next) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
