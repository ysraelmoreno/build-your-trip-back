import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppErrors";
import UsersRepository from "@repository/UsersRepository";

import Repository from "@database/databaseRepo/Repository";

interface ICreateSession {
  userId: string;
  email: string;
  token: string;
  expiresat: string;
}

interface IUser {
  id: string;
  email: string;
  password: string;
}

interface ISession {
  id: string;
  userId: string;
  email: string;
  token: string;
  createdat: Date;
  updatedat: Date;
  expiresat: Date;
}

class SessionRepository extends Repository<ISession> {
  constructor() {
    super("sessions");
  }

  public async create({
    userId,
    email,
    token,
    expiresat,
  }: ICreateSession): Promise<ISession> {
    const session = await this.insert({
      userId,
      email,
      token,
      expiresat,
    });

    return session;
  }

  public async findByToken(token: string): Promise<ISession | undefined> {
    const findSession = await this.findOne({
      where: { token },
    });

    return findSession;
  }
}

export default new SessionRepository();
