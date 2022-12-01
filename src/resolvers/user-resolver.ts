import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Inject, Service } from 'typedi';
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { UpdateUserInput } from "../dtos/inputs/update-user-input";
import { Card } from "../dtos/models/card-model";
import { User } from "../dtos/models/users-model";
import { EnsureAuthenticated } from "../middlewares/ensure-authenticated";
import { EnsureRegistered } from "../middlewares/ensure-registered";
import { GetCardsUseCase } from "../modules/collection/use-cases/get-cards/get-cards-use-case";
import { CreateUserUseCase } from "../modules/users/use-cases/create-user/create-user-use-case";
import { GetUserUseCase } from "../modules/users/use-cases/get-user/get-user-use-case";
import { UpdateUserUseCase } from "../modules/users/use-cases/update-user/update-user-use-case";
import { Context } from "../types/context";
@Service()
@Resolver(() => User)
export class UserResolver {

  constructor(
    @Inject()
    private createUserUseCase: CreateUserUseCase,
    
    @Inject()
    private updateUserUseCase: UpdateUserUseCase,

    @Inject()
    private getUserUseCase: GetUserUseCase,

    @Inject()
    private getCardsUseCase: GetCardsUseCase
  ){}

  @Query(() => User)
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
  async user(@Ctx() ctx: Context){
    return await this.getUserUseCase.execute(ctx.user.id)
  }

  @FieldResolver(() => [Card])
  async cards(@Root() user: User){
    return await this.getCardsUseCase.execute(user.id)
  }

  @Mutation(()=> User)
  async createUser(@Arg('data') data: CreateUserInput) {
    return await this.createUserUseCase.execute(data)
  }

  @Mutation(() => User)
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
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