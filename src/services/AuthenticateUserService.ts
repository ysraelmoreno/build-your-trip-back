import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppErrors';

import SessionRepository from '../repository/SessionRepository';
import UsersRepository from '../repository/UsersRepository';

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Password/Email combination wrong", 401)
    }

    if (password !== user.password) {
      throw new AppError("Password/Email combination wrong", 401)
    }

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({  }, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    await SessionRepository.create({ user, token })

    return {
      user,
      token
    }
  }
}

export default new AuthenticateUserService();
