import AppError from "../errors/AppErrors";
import UsersRepository from "../repository/UsersRepository";
import { hash } from "bcryptjs";

interface ICreateUser {
  name?: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute({ name, email, password }: ICreateUser) {
    const findUserByEmail = await UsersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await UsersRepository.create({
      name: name || "",
      password: hashedPassword,
      email,
    });

    return newUser;
  }
}

export default CreateUserService;
