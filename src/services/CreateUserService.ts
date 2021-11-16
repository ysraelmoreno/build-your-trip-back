import AppError from "../errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute({ name, email, password }: ICreateUser) {
    const findUserByEmail = await UsersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError("Email already exists", 400);
    }

    const newUser = await UsersRepository.create({
      name,
      password,
      email,
    });

    return newUser;
  }
}

export default CreateUserService;
