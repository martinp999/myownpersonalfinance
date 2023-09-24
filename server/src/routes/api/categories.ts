import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";

const dbFacade = new DbFacade();

export const categoriesRouter = express.Router();

categoriesRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(await dbFacade.categories.getAll());
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

categoriesRouter.get(
  "/:categoryId",
  async function (req: Request, res: Response) {
    try {
      res.json(await dbFacade.categories.get(Number(req.params.categoryId)));
    } catch (error) {
      logger.error(error);
      res.status(500).send("something went wrong, check logs");
    }
  }
);

categoriesRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.categories.create({
      name: req.body.name,
      colourPrimary: req.body.colourPrimary,
      colourSecondary: req.body.colourSecondary,
    });
    res.send("success");
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});
