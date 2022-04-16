import Router from "express";
import cardRouter from "./cardRoutes.js";
import operationsRouter from "./operationsRoutes.js";

const router = Router();

router.use(cardRouter);
router.use(operationsRouter);

export default router;
