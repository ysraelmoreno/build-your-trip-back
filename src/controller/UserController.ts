import AppError from "@errors/AppErrors";
import UpdateUserService from "@services/UpdateUserService";
import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

class UsersController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("User id is required", 404);
    }

    const listUserService = new ListUserService();

    const findUser = await listUserService.execute({ id });

    return res.json(findUser);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({ name, email, password });

    return res.json(newUser);
  }

  async update(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { id } = req.params;

    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute(id, {
      name,
      email,
      password,
    });

    return res.json(updatedUser);
  }
}

export default new UsersController();
