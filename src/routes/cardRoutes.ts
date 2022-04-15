import Router from "express";
import * as cardServices from "../controllers/cardsController.js";

const cardRouter = Router();

cardRouter.post("/create-card", cardServices.createCard);

export default cardRouter;
