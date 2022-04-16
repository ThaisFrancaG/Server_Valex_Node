import { Request, Response } from "express";
import * as rechargeServices from "../services/operationsServices.js";

async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params;
  const { recharge } = req.body;
  console.log(recharge);

  await rechargeServices.newRecharge(parseInt(id), recharge);
}

export { rechargeCard };
