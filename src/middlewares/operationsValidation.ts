import { NextFunction, Request, Response } from "express";
import { rechargeSchema } from "../schemas/cardValuesSchema.js";

function validateValueSchema(req: Request, res: Response, next: NextFunction) {
  console.log("chegou na validação de valores");
  let recharge = req.body.recharge;
  let purchase = req.body.purchase;

  console.log(recharge);
  console.log(purchase);

  if (recharge) {
    const validation = rechargeSchema.validate({ recharge });
    if (validation.error) {
      return res.sendStatus(422);
    }
  }
  if (recharge <= 0) {
    throw { code: 400, message: "Recharge Must Be Greater Than 0" };
  }
}

export { validateValueSchema };
