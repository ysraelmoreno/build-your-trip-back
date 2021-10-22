import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

import ListUserService from '../services/ListUserService';

class UsersController {
  async index(_: Request, res: Response) {
    const listUserService = new  ListUserService();

    const showUser = await listUserService.execute();

    res.json(showUser);
  }

  async show(req: Request, res: Response) {}

  async create(req: Request, res: Response) {
      const { name, email, password } = req.body;

      console.log(req.body);

      const createUserService = new CreateUserService();

      const newUser = await createUserService.execute({ name, email, password })

      return res.json(newUser);
  }
}

export default new UsersController();
