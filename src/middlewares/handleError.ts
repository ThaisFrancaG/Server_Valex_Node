import { NextFunction, Request, Response } from "express";

export function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("caiu no middleware");
  console.log(error);
  console.log(error.code);

  if (error) {
    return res.sendStatus(error.code);
  }

  res.sendStatus(500);
}
