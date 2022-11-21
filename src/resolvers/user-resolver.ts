import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from 'typedi';
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { User } from "../dtos/models/users-model";
import { CreateUserUseCase } from "../modules/users/use-cases/create-user/create-user-use-case";
@Service()
@Resolver()
export class UserResolver {

  constructor(
    @Inject()
    private createUserUseCase: CreateUserUseCase
  ){}


  @Query(()=> String)
  async users(){
    return 'Hello world'
  }

  @Mutation(()=> User)
  async createUser(@Arg('data') data: CreateUserInput) {
    return await this.createUserUseCase.execute(data)
  }

}