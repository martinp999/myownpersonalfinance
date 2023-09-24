import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";

const dbFacade = new DbFacade();

export const payeesRouter = express.Router({ mergeParams: true });

payeesRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.payees.getAll(Number(req.params.categoryId)));
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});
