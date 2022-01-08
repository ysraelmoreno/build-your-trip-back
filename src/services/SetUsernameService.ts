import AppError from "@errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { IUser } from "../types/User";

interface IListUser {
  username: string;
}
class SetUsernameService {
  async execute(
    id: string,
    { username }: IListUser
  ): Promise<IUser | undefined> {
    const user = await UsersRepository.findById(id);

    const findUsername = await UsersRepository.findByUsername(username);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (findUsername) {
      throw new AppError("Username already exists", 400);
    }

    if (!username) {
      throw new AppError("Missing fields", 400);
    }

    const newData = {
      username,
    };

    const updatedUser = await UsersRepository.setUsernameToUser(id, newData);

    return updatedUser;
  }
}

export default SetUsernameService;
