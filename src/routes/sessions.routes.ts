import { Router } from "express";

import SessionController from "../controller/SessionController";

const sessionsRouter = Router();

sessionsRouter.post("/", SessionController.create)

export default sessionsRouter;
