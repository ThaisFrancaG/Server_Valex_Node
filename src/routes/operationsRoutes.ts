import Router from "express";
import { validateCardDetails } from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";
import {
  rechargeCard,
  purchase,
  checkBalance,
} from "../controllers/operationsController.js";
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

operationsRouter.get("/card/:id/balance", validateCardDetails, checkBalance);

export default operationsRouter;
