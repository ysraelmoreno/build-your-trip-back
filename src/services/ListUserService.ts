import AppError from "@errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { IUser } from "../types/User";

interface IListUser {
  id: string;
}
class ListUserService {
  async execute({ id }: IListUser): Promise<IUser | undefined> {
    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default ListUserService;
