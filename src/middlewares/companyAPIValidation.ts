import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

async function companyAPIValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let apiKey = req.headers["x-api-key"].toString();

  let checkAPI = await findByApiKey(apiKey);

  if (!checkAPI) {
    throw { code: 401, message: "Check Your Information" };
  }

  next();
}

export { companyAPIValidation };
