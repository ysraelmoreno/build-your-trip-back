import { Router } from "express";

import userController from "../controller/UserController";

const usersRouter = Router();

usersRouter.get("/:id", userController.show);
usersRouter.post("/", userController.create);

export default usersRouter;
