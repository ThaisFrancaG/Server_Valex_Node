import { NextFunction, Request, Response } from "express";
import { cardSchema, newCardSchema } from "../schemas/cardSchema.js";
import dayjs from "dayjs";

import * as currentCardInfo from "../repositories/cardRepository.js";

function validateNewCard(req: Request, res: Response, next: NextFunction) {
  const { employeeId, cardType } = req.body;

  const validation = newCardSchema.validate({ employeeId, cardType });
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}

function validateCardSchema(req: Request, res: Response, next: NextFunction) {
  const { cvc, password } = req.body;

  const validation = cardSchema.validate({ cvc, password });
  if (validation.error) {
    return res.sendStatus(422);
  }

  if (
    password.length !== 4 ||
    parseInt(password) !== parseInt(password) ||
    cvc.length !== 3
  ) {
    return res.sendStatus(409);
  }

  next();
}

async function validateCardDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const cardInfo = await currentCardInfo.findById(parseInt(id));

  if (!cardInfo) {
    throw { code: 404, message: "Card Not Found" };
  }

  const checkExpiration = dayjs().format("MM/YY") > cardInfo.expirationDate;

  if (checkExpiration) {
    throw { code: 401, message: "Check Your Card Date" };
  }

  next();
}

export { validateCardSchema, validateCardDetails, validateNewCard };
