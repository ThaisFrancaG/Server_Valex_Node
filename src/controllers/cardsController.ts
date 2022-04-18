import { Request, Response } from "express";
import * as cardServices from "../services/newCardServices.js";
import * as cardValidationCheck from "../services/validateCardServices.js";
import * as cardBlockingServices from "../services/blockCardService.js";
async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  if (!employeeId || !cardType) {
    return res.sendStatus(422);
  }

  const newCardInfo = await cardServices.newCard(employeeId, cardType);

  res.status(201).send(newCardInfo);
}

async function activateCard(req: Request, res: Response) {
  const { cvc, password } = req.body;
  const { id } = req.params;

  await cardValidationCheck.validateCard(id, cvc, password);

  res.status(202).send("Card Validated");
}

async function blockCard(req: Request, res: Response) {
  const { password } = req.body;
  const { id } = req.params;

  await cardBlockingServices.blockCard(parseInt(id), password);

  res.status(200).send("Card Blocked");
}
async function unBlockCard(req: Request, res: Response) {
  const { password } = req.body;
  const { id } = req.params;

  await cardBlockingServices.unBlockCard(parseInt(id), password);

  res.status(200).send("Card unblocked");
}

export { createCard, activateCard, blockCard, unBlockCard };
