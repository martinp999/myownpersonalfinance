import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";
import { patternsRouter } from "./patterns.js";

const dbFacade = new DbFacade();

export const payeesRouter = express.Router({ mergeParams: true });
payeesRouter.use("/:payeeId/patterns", patternsRouter);

payeesRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.payees.create(
      Number(req.params.subcategoryId),
      req.body.payeeName,
      req.body.payeeDescription
    );
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

payeesRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.payees.getAll(Number(req.params.subcategoryId)));
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

payeesRouter.get("/:payeeId", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.payees.get(Number(req.params.payeeId)));
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

payeesRouter.use("/patterns", patternsRouter);
