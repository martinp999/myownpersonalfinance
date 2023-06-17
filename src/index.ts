import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { fileManagementRouter } from "./routes/fileManagement.js";
import { transactionsRouter } from "./routes/transactions.js";
import { accountsRouter } from "./routes/accounts.js";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/file", fileManagementRouter);
app.use("/transactions", transactionsRouter);
app.use("/accounts", accountsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
