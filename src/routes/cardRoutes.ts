import Router from "express";
import * as cardServices from "../controllers/cardsController.js";
import {
  validateCardSchema,
  validateNewCard,
  validateCardDetails,
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

cardRouter.put(
  "/card/:id/block",
  companyAPIValidation,
  validateCardDetails,
  cardServices.blockCard
);

cardRouter.put(
  "/card/:id/unblock",
  companyAPIValidation,
  validateCardDetails,
  cardServices.unBlockCard
);
export default cardRouter;
