import { Request, Response } from "express";
import * as cardOperations from "../services/operationsServices.js";

async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params;
  const { recharge } = req.body;

  await cardOperations.newRecharge(parseInt(id), recharge);

  res.sendStatus(202);
}

async function purchase(req: Request, res: Response) {
  const { id, businessId } = req.params;
  const { purchase, password } = req.body;
  await cardOperations.newPurchase(
    parseInt(id),
    parseInt(businessId),
    purchase,
    password
  );
  res.sendStatus(202);
}

async function checkBalance(req: Request, res: Response) {
  const { id } = req.params;

  const cardHistory = await cardOperations.cardBalance(parseInt(id));

  res.status(200).send(cardHistory);
}
export { rechargeCard, purchase, checkBalance };
