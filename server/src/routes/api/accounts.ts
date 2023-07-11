import express, { Request, Response } from "express";
import DbFacade from "../../data/dbFacade.js";

const dbFacade = new DbFacade();

export const accountsRouter = express.Router();

accountsRouter.get("/", async function (req: Request, res: Response) {
  res.json(await dbFacade.accounts.getAll());
});

accountsRouter.get("/:accountId", async function (req: Request, res: Response) {
  res.json(await dbFacade.accounts.get(Number(req.params.accountId)));
});

accountsRouter.post("/", async function (req: Request, res: Response) {
  await dbFacade.accounts.create({
    name: req.body.name,
    bank: req.body.bank,
    type: req.body.type,
  });
  res.send("success");
});
