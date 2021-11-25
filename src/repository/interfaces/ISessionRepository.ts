export interface ICreateSession {
  userId: string;
  email: string;
  token: string;
  expiresat: string;
}

export interface ISession {
  id: string;
  userId: string;
  email: string;
  token: string;
  createdat: Date;
  updatedat: Date;
  expiresat: Date;
}

export interface ISessionRepository {
  create({
    email,
    expiresat,
    token,
    userId,
  }: ICreateSession): Promise<ISession>;

  findByToken(token: string): Promise<ISession | undefined>;
}
