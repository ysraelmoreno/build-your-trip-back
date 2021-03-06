import AppError from "@errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { IUser } from "../types/User";

interface IListUser {
  name: string;
  password: string;
}
class UpdateUserService {
  async execute(
    id: string,
    { name, password }: IListUser
  ): Promise<IUser | undefined> {
    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!name || !password) {
      throw new AppError("Missing fields", 400);
    }

    const newData = {
      name,
      password,
    };

    const updatedUser = await UsersRepository.updateUser(id, newData);

    return updatedUser;
  }
}

export default UpdateUserService;
