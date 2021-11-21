import AppError from "../errors/AppErrors";
import SessionRepository from "../repository/SessionRepository";
import UsersRepository from "../repository/UsersRepository";
import getDifferenceInDays from "@utils/getDifferenceInDays";

import AuthenticateUserService from "@services/AuthenticateUserService";

interface IFindSession {
  email: string;
  password: string;
  token: string;
}
class FindAuthenticationService {
  async execute({ email, password, token }: IFindSession) {
    const findUserByEmail = await UsersRepository.findByEmail(email);

    if (!findUserByEmail || findUserByEmail.password !== password) {
      throw new AppError("Wrong email/password combination", 401);
    }

    const findSessionByToken = await SessionRepository.findByToken(token);

    if (!findSessionByToken) {
      throw new AppError("Invalid token", 401);
    }

    const differenceOfDate = getDifferenceInDays(
      findSessionByToken.createdat,
      new Date()
    );

    if (differenceOfDate > 1) {
      const authenticateUser = AuthenticateUserService.execute({
        email,
        password,
      });

      return authenticateUser;
    }

    return { user: findUserByEmail, token: findSessionByToken.token };
  }
}

export default new FindAuthenticationService();
