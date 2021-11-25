import Repository from "@database/repository/Repository";
import getRepository from "@database/getRepository";
import {
  ICreateSession,
  ISession,
  ISessionRepository,
} from "./interfaces/ISessionRepository";

class SessionRepository implements ISessionRepository {
  private repository: Repository<ISession>;

  constructor() {
    this.repository = getRepository("sessions");
  }

  public async create({
    userId,
    email,
    token,
    expiresat,
  }: ICreateSession): Promise<ISession> {
    const session = await this.repository.insert({
      userId,
      email,
      token,
      expiresat,
    });

    return session;
  }

  public async findByToken(token: string): Promise<ISession | undefined> {
    const findSession = await this.repository.findOne({
      where: { token },
    });

    return findSession;
  }
}

export default new SessionRepository();
