import { IUser } from "../types/User";
import AppError from "@errors/AppErrors";

import Repository from "@database/databaseRepo/Repository";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository extends Repository<IUser> {
  constructor() {
    super("users");
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const rows = await this.findOne({ where: { email } });

    return rows;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const row = await this.findOne({ where: { id } });

    return row;
  }

  public async create({ email, name, password }: ICreateUser): Promise<IUser> {
    const row = await this.insert({
      name,
      email,
      password,
      isIncomplete: false,
    });

    return row;
  }
}

export default new UsersRepository();
