import Router from "express";
import * as cardServices from "../controllers/cardsController.js";

const cardRouter = Router();

cardRouter.post("/create-card", cardServices.createCard);
cardRouter.put("/activate-card", cardServices.activateCard);

export default cardRouter;
