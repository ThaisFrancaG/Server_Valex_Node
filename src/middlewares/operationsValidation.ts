import { NextFunction, Request, Response } from "express";
import { purchaseSchema, rechargeSchema } from "../schemas/cardValuesSchema.js";

function validateValueSchema(req: Request, res: Response, next: NextFunction) {
  const operation = Object.keys(req.body)[0];
  const value = Object.values(req.body)[0];

  const toValidate =
    operation === "recharge" ? { recharge: value } : { purchase: value };

  const validation =
    operation === "recharge"
      ? rechargeSchema.validate(toValidate)
      : purchaseSchema.validate(toValidate);

  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(422);
  }
  if (value <= 0) {
    throw { code: 400, message: "Value Must Be Greater Than 0" };
  }
  next();
}

export { validateValueSchema };
