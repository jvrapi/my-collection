import { Inject, Service } from "typedi";
import { UsersRepository } from "../../repositories/users-repository";

@Service()
export class GetUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository
  ){}

  async execute(userId: string){
    return this.usersRepository.findById(userId)
  }
}