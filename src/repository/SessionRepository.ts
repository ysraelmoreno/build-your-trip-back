import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppErrors';
import UsersRepository from './UsersRepository';
interface ICreateSession {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  email: string;
  password: string;
}

interface ISession {
  user: IUser;
  token: string;
}

interface IListSession {
  email: string;
}

class SessionRepository {
  protected session: ISession[] = [];

  async list({ email }: IListSession) {
    return this.session.find(session => session.user.email === email);
  }

  async create({ user, token }: ISession) {
    this.session.push({ user, token });
  }
}

export default new SessionRepository();
