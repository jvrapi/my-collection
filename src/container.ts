import Container from "typedi"
import { PrismaCardsRepository } from "./modules/cards/repository/prisma-collections-repository"
import { PrismaCollectionsRepository } from "./modules/collection/repositories/prisma-collections-repository"
import { SdkScryfallRepository } from "./modules/scryfall/repositories/sdk-scryfall-repository"
import { PrismaUsersRepository } from "./modules/users/repositories/prisma-users-repository"
import { BcryptPasswordProvider } from "./providers/password/bcrypt-password-provider"
import { JwtTokenProvider } from "./providers/token/jwt-token-provider"

Container.set('UsersRepository', new PrismaUsersRepository())
Container.set('BcryptProvider', new BcryptPasswordProvider())
Container.set('JwtTokenProvider', new JwtTokenProvider())
Container.set('CollectionsRepository', new PrismaCollectionsRepository())
Container.set('CardsRepository', new PrismaCardsRepository())
Container.set('ScryfallRepository', new SdkScryfallRepository())