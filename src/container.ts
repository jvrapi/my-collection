import Container from "typedi"
import { PrismaUsersRepository } from "./modules/repositories/prisma-users-repository"
import { BcryptPasswordProvider } from "./providers/password-provider/bcrypt-password-provider"

export const registerContainers = () => {
  Container.set('usersRepository', new PrismaUsersRepository())
  Container.set('bcryptProvider', new BcryptPasswordProvider())
}