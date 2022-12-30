import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { CreateUserInput } from '../dtos/inputs/create-user-input';
import { UpdateUserInput } from '../dtos/inputs/update-user-input';
import { UserCollectionFilters } from '../dtos/inputs/user-collection-filters';
import { UserCardModel } from '../dtos/models/user-card-model';
import { UserCardsModel } from '../dtos/models/user-cards-model';
import { UserCreated } from '../dtos/models/user-created-model';
import { User } from '../dtos/models/users-model';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';
import { EnsureRegistered } from '../middlewares/ensure-registered';
import { GetCollectionUseCase } from '../modules/collection/use-cases/get-collection/get-collection-use-case';
import { CreateUserUseCase } from '../modules/users/use-cases/create-user/create-user-use-case';
import { GetUserUseCase } from '../modules/users/use-cases/get-user/get-user-use-case';
import { UpdateUserUseCase } from '../modules/users/use-cases/update-user/update-user-use-case';
import { Context } from '../types/context';

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
    private getCollectionUseCase: GetCollectionUseCase,
  ) {}

  @Query(() => User)
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
  async user(@Ctx() ctx: Context) {
    return this.getUserUseCase.execute(ctx.user.id);
  }

  @Mutation(() => UserCreated)
  async createUser(@Arg('data') data: CreateUserInput) {
    return this.createUserUseCase.execute(data);
  }

  @Mutation(() => User)
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
  async updateUser(
  @Arg('data') data: UpdateUserInput,
    @Ctx() ctx: Context,

  ) {
    return this.updateUserUseCase.execute({
      ...data,
      id: ctx.user.id,
    });
  }

  @FieldResolver(() => UserCardsModel)
  async cards(@Root() user: User, @Arg('data') data: UserCollectionFilters) {
    const { limit, page } = data;
    return this.getCollectionUseCase.execute({
      userId: user.id,
      limit,
      page
    });
  }
}
