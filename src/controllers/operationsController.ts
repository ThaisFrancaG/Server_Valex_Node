import { Request, Response } from "express";
import * as rechargeServices from "../services/operationsServices.js";

async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params;
  const { recharge } = req.body;

  await rechargeServices.newRecharge(parseInt(id), recharge);

  res.sendStatus(202);
}

export { rechargeCard };
