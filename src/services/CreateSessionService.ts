import { sign } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "../errors/AppErrors";
import SessionRepository from "../repository/SessionRepository";
import UsersRepository from "../repository/UsersRepository";

interface ICreateSession {
  email: string;
  password: string;
}
class CreateSessionService {
  async execute({ email, password }: ICreateSession) {
    const findUserByEmail = await UsersRepository.findByEmail(email);

    if (!findUserByEmail || findUserByEmail.password !== password) {
      throw new AppError("Wrong email/password combination", 401);
    }

    const { expiresIn: expiresAt, secret } = authConfig.jwt;

    const userId = findUserByEmail.id;

    const token = sign({}, secret, {
      subject: userId,
      expiresIn: expiresAt,
    });

    const newUser = await SessionRepository.create({
      userId,
      email,
      token,
      expiresAt,
    });

    return newUser;
  }
}

export default CreateSessionService;
