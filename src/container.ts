import Container from "typedi"
import { PrismaCardsRepository } from "./modules/collection/repositories/prisma-cards-repository"
import { SdkScryfallRepository } from "./modules/scryfall/repositories/sdk-scryfall-repository"
import { PrismaUsersRepository } from "./modules/users/repositories/prisma-users-repository"
import { BcryptPasswordProvider } from "./providers/password/bcrypt-password-provider"
import { JwtTokenProvider } from "./providers/token/jwt-token-provider"

Container.set('usersRepository', new PrismaUsersRepository())
Container.set('bcryptProvider', new BcryptPasswordProvider())
Container.set('jwtTokenProvider', new JwtTokenProvider())
Container.set('cardsRepository', new PrismaCardsRepository())
Container.set('scryfallRepository', new SdkScryfallRepository())