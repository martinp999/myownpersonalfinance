import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";

const dbFacade = new DbFacade();

export const transactionsRouter = express.Router();

transactionsRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.transactions.getAll());
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

transactionsRouter.get(
  "/sortable",
  async function (req: Request, res: Response) {
    try {
      res.json(await dbFacade.transactions.getDistinctDescriptions());
    } catch (error) {
      logger.error(error);
      res.status(500).send("something went wrong, check logs");
    }
  }
);

transactionsRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.transactions.insert({
      account: req.body.account,
      date: req.body.date,
      description: req.body.description,
      debitAmount: req.body.debitAmount,
      creditAmount: req.body.creditAmount,
    });
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});
