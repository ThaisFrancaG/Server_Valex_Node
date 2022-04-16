import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import { handleError } from "./middlewares/handleError.js";
import router from "./routes/indexRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

export default app;
