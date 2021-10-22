import UsersRepository from "../repository/UsersRepository";
import { User } from "../types/User";

class ListUserService {
  async execute(): Promise<User[]> {
    const users = UsersRepository.list()

    return users;
  }
}

export default ListUserService;
