import { Inject, Service } from "typedi";
import { ApiError } from "../../../../errors/Error";
import { PasswordProvider } from "../../../../providers/password/password-provider";
import { TokenProvider } from "../../../../providers/token/token-provider";
import { isEmail } from "../../../../utils/is-email";
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

    let user = await this.usersRepository.findByUsername(username)

    if(isEmail(username)){
      user = await this.usersRepository.findByEmail(username)
    }

    if(!user){
      throw new Error('E-mail or password incorrect')
    }

    const passwordIsCorrect = await this.passwordProvider.compare(password, user.password)

    if(!passwordIsCorrect){
      throw new Error('E-mail or password incorrect')
    }

    const token = this.tokenProvider.generateToken({userId: user.id})

    return token

  }
}