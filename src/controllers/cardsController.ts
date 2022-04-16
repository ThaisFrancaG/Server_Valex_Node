import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  if (!employeeId || !cardType) {
    return res.sendStatus(422);
  }

  let cardInfo = await cardServices.newCard(employeeId, cardType);

  console.log(cardInfo);
}

export { createCard };
