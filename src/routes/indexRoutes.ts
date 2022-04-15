import Router from "express";
import cardRouter from "./cardRoutes.js";

const router = Router();

router.use(cardRouter);

export default router;
