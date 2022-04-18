import Router from "express";
import * as cardServices from "../controllers/cardsController.js";
import {
  validateCardSchema,
  validateNewCard,
} from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";

const cardRouter = Router();

cardRouter.post(
  "/card/create",
  companyAPIValidation,
  validateNewCard,
  cardServices.createCard
);
cardRouter.put(
  "/card/:id/activate",
  companyAPIValidation,
  validateCardSchema,
  cardServices.activateCard
);

export default cardRouter;
