import AppError from "@errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { IUser } from "../types/User";

interface IListUser {
  password: string;
  confirmPassword: string;
}
class UpdatePasswordService {
  async execute(
    id: string,
    { password, confirmPassword }: IListUser
  ): Promise<IUser | undefined> {
    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!password || !confirmPassword) {
      throw new AppError("Missing fields", 400);
    }

    if (password !== confirmPassword) {
      throw new AppError("Password and confirm password must be the same", 400);
    }

    const newData = {
      password,
    };

    const updatedUser = await UsersRepository.updatePassword(id, newData);

    return updatedUser;
  }
}

export default UpdatePasswordService;
