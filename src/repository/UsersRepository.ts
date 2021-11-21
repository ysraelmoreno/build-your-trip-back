import { IUser } from "@appTypes/User";

import Repository from "@database/databaseRepo/Repository";
import { IUserData, IUsersRepository } from "./interfaces/IUsersRepository";
import AppError from "@errors/AppErrors";

class UsersRepository extends Repository<IUser> implements IUsersRepository {
  constructor() {
    super("users");
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.findOne({ where: { id } });

    return user;
  }

  public async createSoft({
    email,
    password,
  }: Omit<IUserData, "name">): Promise<IUser> {
    const user = await this.insert({
      email,
      password,
      isIncomplete: true,
    });

    return user;
  }

  public async create({ email, name, password }: IUserData): Promise<IUser> {
    const user = await this.insert({
      name,
      email,
      password,
      isIncomplete: false,
    });

    return user;
  }

  public async updateUser(
    id: string,
    { email, name, password }: IUserData
  ): Promise<IUser | undefined> {
    const user = await this.findOne({ where: { id } });

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

    const newUser = await this.update(newData, { id });

    return newUser;
  }
}

export default new UsersRepository();
