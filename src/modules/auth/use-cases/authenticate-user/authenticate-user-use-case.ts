import { Inject, Service } from "typedi";
import { ApiError } from "../../../../errors/Error";
import { PasswordProvider } from "../../../../providers/password/password-provider";
import { TokenProvider } from "../../../../providers/token/token-provider";
import { UsersRepository } from "../../../users/repositories/users-repository";

interface AuthenticateUserUseCaseRequest {
  username: string
  password: string
}

@Service()
export class AuthenticateUserUseCase{
  constructor(
      @Inject('usersRepository')
      private usersRepository: UsersRepository,
      
      @Inject('bcryptProvider')
      private passwordProvider: PasswordProvider,
      
      @Inject('jwtTokenProvider')
      private tokenProvider: TokenProvider
  ){}

  async execute({username, password}: AuthenticateUserUseCaseRequest){
    if(!username || !password){
      throw new ApiError('Missing some information')
    }

    const userExists = await this.usersRepository.findByEmailOrUsername(username, username)


    if(!userExists){
      throw new Error('E-mail or password incorrect')
    }

    const passwordIsCorrect = await this.passwordProvider.compare(password, userExists.password)

    if(!passwordIsCorrect){
      throw new Error('E-mail or password incorrect')
    }

    const token = this.tokenProvider.generateToken({userId: userExists.id})

    return token

  }
}