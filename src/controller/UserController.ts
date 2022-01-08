import AppError from "@errors/AppErrors";
import ListUserByUsernameService from "@services/ListUserByUsernameService";
import SetUsernameService from "@services/SetUsernameService";
import UpdatePasswordService from "@services/UpdatePasswordService";
import UpdateUserService from "@services/UpdateUserService";
import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

class UsersController {
  async show(req: Request, res: Response) {
    const { user } = req.params;
    const identifyUsername = /@/gm;
    const listUserService = new ListUserService();
    const listUserByUsernameService = new ListUserByUsernameService();

    if (!user) {
      throw new AppError("User id is required", 404);
    }

    if (identifyUsername.test(user)) {
      const findUserByUsername = await listUserByUsernameService.execute({
        username: user,
      });

      return res.status(200).json(findUserByUsername);
    }

    const findUser = await listUserService.execute({ id: user });

    return res.status(200).json(findUser);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({ name, email, password });

    return res.status(200).json(newUser);
  }

  async update(req: Request, res: Response) {
    const { name, password } = req.body;
    const { id } = req.params;

    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute(id, {
      name,
      password,
    });

    return res.status(200).json(updatedUser);
  }

  async setUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const { id } = req.params;

      const setUsernameService = new SetUsernameService();

      const updatedUser = await setUsernameService.execute(id, {
        username,
      });

      return res.status(200).json(updatedUser);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async passwordUpdate(req: Request, res: Response) {
    const { password, confirmPassword } = req.body;
    const { id } = req.params;

    const updatePasswordService = new UpdatePasswordService();

    const updatedUser = await updatePasswordService.execute(id, {
      password,
      confirmPassword,
    });

    return res.status(200).json(updatedUser);
  }
}

export default new UsersController();
