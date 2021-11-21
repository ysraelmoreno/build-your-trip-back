import { Request, Response } from "express";
import AuthenticateUserService from "@services/AuthenticateUserService";
import FindAuthenticationService from "@services/FindAuthenticationService";
import AppError from "@errors/AppErrors";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const session = await AuthenticateUserService.execute({
        email,
        password,
      });

      return res.json(session);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        throw new AppError("Token not provided", 401);
      }

      const [_, token] = bearerToken.split(" ");

      const session = await FindAuthenticationService.execute({
        email,
        password,
        token,
      });

      return res.json(session);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new SessionController();
