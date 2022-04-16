import Router from "express";
import * as cardServices from "../controllers/cardsController.js";

const cardRouter = Router();

cardRouter.post("/card/create", cardServices.createCard);
cardRouter.put("/card/:id/activate", cardServices.activateCard);

export default cardRouter;
