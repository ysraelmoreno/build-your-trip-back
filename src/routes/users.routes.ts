import ensureAuthenticated from "@middlewares/ensureAuthenticated";
import { Router } from "express";

import userController from "../controller/UserController";

const usersRouter = Router();

usersRouter.get("/:user", ensureAuthenticated, userController.show);
usersRouter.patch("/:id", ensureAuthenticated, userController.update);
usersRouter.post("/", userController.create);
usersRouter.put(
  "/password/:id",
  ensureAuthenticated,
  userController.passwordUpdate
);

usersRouter.put(
  "/username/:id",
  ensureAuthenticated,
  userController.setUsername
);

export default usersRouter;
