import { IUser } from "@appTypes/User";

import Repository from "@database/repository/Repository";
import { IUserData, IUsersRepository } from "./interfaces/IUsersRepository";
import AppError from "@errors/AppErrors";
import getRepository from "@database/getRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<IUser>;

  constructor() {
    this.repository = getRepository("users");
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  public async createSoft({
    email,
    password,
  }: Omit<IUserData, "name">): Promise<IUser> {
    const user = await this.repository.insert({
      email,
      password,
      isIncomplete: true,
    });

    return user;
  }

  public async create({ email, name, password }: IUserData): Promise<IUser> {
    const user = await this.repository.insert({
      name,
      email,
      password,
      isIncomplete: false,
    });

    return user;
  }

  public async updatePassword(
    id: string,
    { password }: Record<string, string>
  ) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    const newData = {
      ...user,
      password,
    };

    const newUser = await this.repository.update(newData, { id });

    return newUser;
  }

  public async updateUser(
    id: string,
    { email, name, password }: IUserData
  ): Promise<IUser | undefined> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    const userInfo = {
      email: user.email,
      name: user.name,
      password: user.password,
    };

    const newData = {
      ...userInfo,
      email,
      name,
      password,
      isincomplete: false,
      updatedat: new Date(),
    };

    const newUser = await this.repository.update(newData, { id });

    return newUser;
  }
}

export default new UsersRepository();
