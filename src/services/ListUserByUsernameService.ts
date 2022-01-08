import AppError from "@errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { IUser } from "../types/User";

interface IListUser {
  username: string;
}
class ListUserByUsernameService {
  async execute({ username }: IListUser): Promise<IUser | undefined> {
    const [_, usernameFormatted] = username.split("@");

    const findUsername = await UsersRepository.findByUsername(
      usernameFormatted
    );

    return findUsername;
  }
}

export default ListUserByUsernameService;
