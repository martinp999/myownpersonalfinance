import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";
import { logger } from "../../utils/logger.js";
import { payeesRouter } from "./payees.js";

const dbFacade = new DbFacade();

export const subcategoriesRouter = express.Router({ mergeParams: true });
subcategoriesRouter.use("/:subcategoryId/payees", payeesRouter);

subcategoriesRouter.post("/", async function (req: Request, res: Response) {
  try {
    await dbFacade.subcategories.create(Number(req.params.categoryId), {
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

subcategoriesRouter.get("/", async function (req: Request, res: Response) {
  try {
    res.json(
      await dbFacade.subcategories.getAll(Number(req.params.categoryId))
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("something went wrong, check logs");
  }
});

subcategoriesRouter.get(
  "/:subcategoryId",
  async function (req: Request, res: Response) {
    try {
      logger.info(
        `subcategoriesRouter.get(categoryId: ${req.params.categoryId}, subcategoryId: ${req.params.subcategoryId})`
      );
      res.json(
        await dbFacade.subcategories.get(
          Number(req.params.categoryId),
          Number(req.params.subcategoryId)
        )
      );
    } catch (error) {
      logger.error(error);
      res.status(500).send("something went wrong, check logs");
    }
  }
);
