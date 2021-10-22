import { Router } from "express";

import userController from "../controller/UserController";

const usersRouter = Router();

usersRouter.get("/",userController.index)
usersRouter.post("/",userController.create)

export default usersRouter;
