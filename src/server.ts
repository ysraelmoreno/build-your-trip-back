import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import AppError from "./errors/AppErrors";
import routes from "./routes/routes";

import "./database";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => console.log("🚀 Server started on port 3333"));
