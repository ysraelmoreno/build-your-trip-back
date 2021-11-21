import Repository from "@database/repository/Repository";
import getRepository from "@database/getRepository";

interface ICreateSession {
  userId: string;
  email: string;
  token: string;
  expiresat: string;
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

class SessionRepository {
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
