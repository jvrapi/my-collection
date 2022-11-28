import { Inject, Service } from 'typedi';
import { CreateUserInput } from '../../../../dtos/inputs/create-user-input';
import { ApiError } from '../../../../errors/Error';
import { PasswordProvider } from '../../../../providers/password/password-provider';
import { UsersRepository } from '../../repositories/users-repository';


@Service()
export class CreateUserUseCase{
  constructor(
      @Inject('usersRepository')
      private usersRepository: UsersRepository,
      @Inject('bcryptProvider')
      private passwordProvider: PasswordProvider
    ){}
  async execute({name,email,password,username}: CreateUserInput){

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)
    const usernameAlreadyInUse = await this.usersRepository.findByUsername(username)

    if(emailAlreadyInUse || usernameAlreadyInUse){
      throw new ApiError('Users already exists!')
    }

    const passwordHashed = await this.passwordProvider.hashPassword(password)
    
    const userCreated= await this.usersRepository.create({
      email,
      name,
      password: passwordHashed,
      username
    })

    delete userCreated.password

    return userCreated
  }
}