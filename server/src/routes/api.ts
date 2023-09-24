import express from "express";
import { fileManagementRouter } from "./api/fileManagement.js";
import { transactionsRouter } from "./api/transactions.js";
import { accountsRouter } from "./api/accounts.js";
import { categoriesRouter } from "./api/categories.js";
import { payeesRouter } from "./api/payees.js";

export const apiRouter = express.Router();

apiRouter.use("/file", fileManagementRouter);
apiRouter.use("/transactions", transactionsRouter);
apiRouter.use("/accounts", accountsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/categories/:categoryId/payees", payeesRouter);
