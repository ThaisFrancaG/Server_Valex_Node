import Router from "express";
import { validateCardDetails } from "../middlewares/cardValidation.js";
import { companyAPIValidation } from "../middlewares/companyAPIValidation.js";
import { rechargeCard } from "../controllers/operationsController.js";
import { validateValueSchema } from "../middlewares/operationsValidation.js";

const operationsRouter = Router();

operationsRouter.post(
  "/card/:id/recharge",
  companyAPIValidation,
  validateCardDetails,
  validateValueSchema,
  rechargeCard
);

operationsRouter.post(
  "/card/:id/purchase/:businessId",
  companyAPIValidation,
  validateCardDetails
);

export default operationsRouter;
