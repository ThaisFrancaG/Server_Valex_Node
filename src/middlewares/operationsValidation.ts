import { NextFunction, Request, Response } from "express";
import { rechargeSchema } from "../schemas/cardValuesSchema.js";

function validateRechargeSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let recharge = req.body.recharge;
  const validation = rechargeSchema.validate({ recharge });
  if (validation.error) {
    return res.sendStatus(422);
  }
  if (recharge <= 0) {
    throw { code: 400, message: "Recharge Must Be Greater Than 0" };
  }
  next();
}

export { validateRechargeSchema };
