import { Request, Response } from 'express'
import SessionRepository from '../repository/SessionRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body

    const session = await AuthenticateUserService.execute({ email, password })

    return res.json(session)
  }
}

export default new SessionController();
