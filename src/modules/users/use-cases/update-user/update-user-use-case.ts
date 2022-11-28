import { Inject, Service } from "typedi";
import { UpdateUserInput } from "../../../../dtos/inputs/update-user-input";
import { ApiError } from "../../../../errors/Error";
import { UsersRepository } from '../../repositories/users-repository';

interface UpdateUserUseCaseRequest extends UpdateUserInput{
  id: string
}

@Service()
export class UpdateUserUseCase{
  constructor(
    @Inject('usersRepository')
    private usersRepository: UsersRepository

  ){}

  async execute({id,email,name,username}: UpdateUserUseCaseRequest){ 
    const user = await this.usersRepository.findById(id)


    if(!user){
      throw new ApiError('Invalid user')
    }

    if(email !== user.email){
      const newEmailAlreadyInUse = await this.usersRepository.findByEmail(email)
      if(newEmailAlreadyInUse){
        throw new ApiError('New email already in use')
      }
    }

    if(username !== user.username){
      const newUsernameAlreadyInUse = await this.usersRepository.findByUsername(username)
      if(newUsernameAlreadyInUse){
        throw new ApiError('New username already in use')
      }
    }

    user.email = email
    user.name = name
    user.username = username

    const userUpdated = await this.usersRepository.save(user)

    return userUpdated


  }
}