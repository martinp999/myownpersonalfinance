import express, { Request, Response } from "express";
import DbFacade from "../data/dbFacade.js";

const dbFacade = new DbFacade();

export const transactionsRouter = express.Router();

transactionsRouter.post("/", async function (req: Request, res: Response) {
  await dbFacade.transactions.insert({
    account: req.body.account,
    date: req.body.date,
    description: req.body.description,
    debitAmount: req.body.debitAmount,
    creditAmount: req.body.creditAmount,
  });
  res.send("success");
});
