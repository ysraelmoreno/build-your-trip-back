import { IUser } from "../types/User";

import Repository from "@database/databaseRepo/Repository";

interface IUserData {
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

  public async createSoft({
    email,
    password,
  }: Omit<IUser, "name">): Promise<IUser> {
    const row = await this.insert({
      email,
      password,
      isIncomplete: true,
    });

    return row;
  }

  public async create({ email, name, password }: IUserData): Promise<IUser> {
    const row = await this.insert({
      name,
      email,
      password,
      isIncomplete: false,
    });

    return row;
  }

  public async updateUser(
    id: string,
    { email, name, password }: IUserData
  ): Promise<IUser | undefined> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      return;
    }
    // @ts-expect-error
    delete user.createdat;
    // @ts-expect-error
    delete user.updatedat;
    // @ts-expect-error
    delete user.id;

    const newData = {
      ...user,
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
