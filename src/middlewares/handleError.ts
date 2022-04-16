import { NextFunction, Request, Response } from "express";

export function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    return res.status(error.code).send(error.message);
  }

  res.sendStatus(500);
}
