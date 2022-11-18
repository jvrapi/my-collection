import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from 'typedi';
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { User } from "../dtos/models/users-model";
import { EnsureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { CreateUserUseCase } from "../modules/users/use-cases/create-user-use-case";
@Service()
@Resolver()
export class UserResolver {

  constructor(
      @Inject()
      private createUserUseCase: CreateUserUseCase
    ){}


  @Query(()=> String)
  @UseMiddleware(EnsureAuthenticated)
  async users(){
    return 'Hello world'
  }

  @Mutation(()=> User)
  async createUser(@Arg('data') data: CreateUserInput) {
    return await this.createUserUseCase.execute(data)
  }

}