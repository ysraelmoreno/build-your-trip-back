import { v4 } from 'uuid'
import { User } from '../types/User';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  protected users: User[] = [];

  public async list(): Promise<User[]> {
    return this.users;
  }

  public async create({ email, name, password }: ICreateUser): Promise<User> {
    const newUser = {
      id: v4(),
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }
}

export default new UsersRepository();
