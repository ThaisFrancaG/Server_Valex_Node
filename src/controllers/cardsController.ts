import { Request, Response } from "express";
import * as cardServices from "../services/newCardServices.js";
import * as cardValidation from "../services/validateCardServices.js";
async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  if (!employeeId || !cardType) {
    return res.sendStatus(422);
  }

  await cardServices.newCard(employeeId, cardType);

  res.status(201).send("New Card Added");
}

async function activateCard(req: Request, res: Response) {
  const { cvc, password } = req.body;
  const { id } = req.params;

  await cardValidation.validateCard(id, cvc, password);

  res.status(202).send("Card Validated");
}

export { createCard, activateCard };
