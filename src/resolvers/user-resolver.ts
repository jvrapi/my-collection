import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from 'typedi';
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { UpdateUserInput } from "../dtos/inputs/update-user-input";
import { User } from "../dtos/models/users-model";
import { EnsureAuthenticated } from "../middlewares/ensure-authenticated";
import { CreateUserUseCase } from "../modules/users/use-cases/create-user/create-user-use-case";
import { GetUserUseCase } from "../modules/users/use-cases/get-user/get-user-use-case";
import { UpdateUserUseCase } from "../modules/users/use-cases/update-user/update-user-use-case";
import { Context } from "../types/context";
@Service()
@Resolver()
export class UserResolver {

  constructor(
    @Inject()
    private createUserUseCase: CreateUserUseCase,
    
    @Inject()
    private updateUserUseCase: UpdateUserUseCase,

    @Inject()
    private getUserUseCase: GetUserUseCase
  ){}

  @Query(() => User)
  @UseMiddleware(EnsureAuthenticated)
  async getUsers(@Ctx() ctx: Context){
    return await this.getUserUseCase.execute(ctx.user.id)
  }

  @Mutation(()=> User)
  async createUser(@Arg('data') data: CreateUserInput) {
    return await this.createUserUseCase.execute(data)
  }

  @Mutation(() => User)
  @UseMiddleware(EnsureAuthenticated)
  async updateUser(
      @Arg('data') data: UpdateUserInput,
      @Ctx() ctx: Context
    
    ){
    return this.updateUserUseCase.execute({
      ...data,
      id: ctx.user.id
    })
  }

}