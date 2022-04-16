import Router from "express";
import { validateCardId } from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";
import { rechargeCard } from "../controllers/operationsController.js";
import { validateValueSchema } from "../middlewares/operationsValidation.js";

const operationsRouter = Router();

operationsRouter.post(
  "/card/:id/recharge",
  companyAPIValidation,
  validateCardId,
  validateValueSchema,
  rechargeCard
);

export default operationsRouter;
