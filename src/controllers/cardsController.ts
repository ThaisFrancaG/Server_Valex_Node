import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";
async function createCard(req: Request, res: Response) {
  console.log("chegou no card controller");
  //first, what does it gets sent to it
  //valid API key + employee identification + type of card
  //The employee can be just the id, and then check the rest of the information on the database

  const { employeeId, cardType } = req.body;

  //First, check if the user is an ok user? Or does it goes to the services?
  //I will say that this goes to services, but then i can still check if there was stuff sent.

  if (!employeeId || !cardType) {
    console.log("caiu no caso de entrada vazia");
    return res.sendStatus(422);
  }

  //send the information thru a function call

  let cardInfo = cardServices.createCard(employeeId, cardType);

  console.log(cardInfo);
}

export { createCard };
