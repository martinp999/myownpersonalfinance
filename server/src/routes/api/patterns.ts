import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";

const dbFacade = new DbFacade();

export const patternsRouter = express.Router({ mergeParams: true });

patternsRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.patterns.create(
      Number(req.params.payeeId),
      req.body.pattern
    );
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

patternsRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.patterns.getAll(Number(req.params.payeeId)));
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});
