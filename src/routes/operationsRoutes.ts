import Router from "express";
import { validateCardDetails } from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";
import { rechargeCard, purchase } from "../controllers/operationsController.js";
import {
  validateRechargeSchema,
  validatePurchaseSchema,
} from "../middlewares/operationsValidation.js";

const operationsRouter = Router();

operationsRouter.post(
  "/card/:id/recharge",
  companyAPIValidation,
  validateCardDetails,
  validateRechargeSchema,
  rechargeCard
);

operationsRouter.post(
  "/card/:id/purchase/:businessId",
  companyAPIValidation,
  validateCardDetails,
  validatePurchaseSchema,
  purchase
);

export default operationsRouter;
