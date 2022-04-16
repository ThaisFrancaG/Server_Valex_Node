import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  if (!employeeId || !cardType) {
    return res.sendStatus(422);
  }

  await cardServices.newCard(employeeId, cardType);

  res.status(200).send("New Card Added");
}

async function activateCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  if (!employeeId || !cardType) {
    return res.sendStatus(422);
  }

  await cardServices.newCard(employeeId, cardType);

  res.status(200).send("New Card Added");
}

export { createCard };
