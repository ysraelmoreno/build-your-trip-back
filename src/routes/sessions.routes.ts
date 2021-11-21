import { Router } from "express";

import SessionController from "../controller/SessionController";

const sessionsRouter = Router();

sessionsRouter.post("/", SessionController.create);
sessionsRouter.post("/login", SessionController.login);

export default sessionsRouter;
