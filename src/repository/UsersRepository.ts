import { IUser } from "../types/User";
import AppError from "@errors/AppErrors";

import { query } from "@database/index";
import UsersRepo from "@database/databaseRepo/Users.repo";
interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  public async findByEmail(email: string): Promise<IUser | undefined> {
    const rows = await UsersRepo.findOne({ select: "*", where: { email } });

    return rows[0];
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const [row] = await UsersRepo.findOne({ select: "*", where: { id } });

    return row;
  }

  public async create({ email, name, password }: ICreateUser): Promise<IUser> {
    const findUserByEmail = await this.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError("Email already exists", 400);
    }

    const [row] = await query(
      "INSERT INTO users (name, email, password, isIncomplete) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, false]
    );

    return row;
  }
}

export default new UsersRepository();
