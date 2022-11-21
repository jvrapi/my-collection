import Container from "typedi"
import { PrismaUsersRepository } from "./modules/users/repositories/prisma-users-repository"
import { BcryptPasswordProvider } from "./providers/password/bcrypt-password-provider"
import { JwtTokenProvider } from "./providers/token/jwt-token-provider"

export const registerContainers = () => {
  Container.set('usersRepository', new PrismaUsersRepository())
  Container.set('bcryptProvider', new BcryptPasswordProvider())
  Container.set('jwtTokenProvider', new JwtTokenProvider())
}