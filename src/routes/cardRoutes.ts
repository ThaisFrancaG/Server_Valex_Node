import Router from "express";
import * as cardServices from "../controllers/cardsController.js";
import { validateCardSchema } from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";

const cardRouter = Router();

cardRouter.post("/card/create", companyAPIValidation, cardServices.createCard);
cardRouter.put(
  "/card/:id/activate",
  companyAPIValidation,
  validateCardSchema,
  cardServices.activateCard
);

export default cardRouter;
