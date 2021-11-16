import { IUser } from "@appTypes/User";

export interface IUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  createSoft(data: Omit<IUserData, "name">): Promise<IUser>;
  create(data: IUserData): Promise<IUser>;
  updateUser(id: string, data: IUserData): Promise<IUser | undefined>;
}
