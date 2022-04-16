import Router from "express";
import * as cardServices from "../controllers/cardsController.js";
import { validateCardSchema } from "../middlewares/cardValidation.js";
const cardRouter = Router();

cardRouter.post("/card/create", cardServices.createCard);
cardRouter.put(
  "/card/:id/activate",
  validateCardSchema,
  cardServices.activateCard
);

export default cardRouter;
