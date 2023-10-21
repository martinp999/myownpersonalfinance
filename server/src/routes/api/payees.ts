import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";
import { payeesRegExpRouter } from "./payees_regexp.js";

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

payeesRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.payees.create(
      Number(req.params.categoryId),
      req.body.payeeName,
      req.body.payeeDescription
    );
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

payeesRouter.use("/regexp", payeesRegExpRouter);
