import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import authConfig from "@config/auth";
import AppError from "../errors/AppErrors";
import SessionRepository from "../repository/SessionRepository";
import UsersRepository from "../repository/UsersRepository";

interface ICreateSession {
  email: string;
  password: string;
}
class AuthenticateUserService {
  async execute({ email, password }: ICreateSession) {
    const findUserByEmail = await UsersRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError("Wrong email/password combination", 401);
    }

    const passwordMatch = compare(password, findUserByEmail?.password);

    if (!passwordMatch) {
      throw new AppError("Wrong email/password combination", 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const userId = findUserByEmail.id;

    const token = sign({}, secret, {
      subject: userId,
      expiresIn,
    });

    await SessionRepository.create({
      userId,
      email,
      token,
      expiresat: expiresIn,
    });

    return { user: findUserByEmail, token };
  }
}

export default new AuthenticateUserService();
