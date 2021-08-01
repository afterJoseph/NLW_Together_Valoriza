import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // Check Email exists
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email or Password incorrect");
    }
    // Check if Password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or Password incorrect");
    }

    // Generate Token
    const token = sign(
      {
        email: user.email,
      },
      "3a5db06fee73af7cff22ffcc1225818a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
