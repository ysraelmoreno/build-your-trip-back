import { Router } from "express";

import userController from "../controller/UserController";

const usersRouter = Router();

usersRouter.get("/:id", userController.show);
usersRouter.patch("/:id", userController.update);
usersRouter.post("/", userController.create);

export default usersRouter;
