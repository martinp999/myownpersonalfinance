import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";

const dbFacade = new DbFacade();

export const accountsRouter = express.Router();

accountsRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.accounts.getAll());
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

accountsRouter.get("/:accountId", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.accounts.get(Number(req.params.accountId)));
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

accountsRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.accounts.create({
      name: req.body.name,
      bank: req.body.bank,
      type: req.body.type,
    });
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});
