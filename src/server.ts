import app from "./app";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";

//isso acaba que vira um try-catch gigante para lidar com os throws
//vouy deixar comentadinho pra puxar depois

//app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//  console.log(error);
//  if (error.response) {
//   return res.sendStatus(error.response.status);
// }

// res.sendStatus(500);
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
