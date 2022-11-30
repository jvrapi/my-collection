import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { AddCardInput } from "../dtos/inputs/add-card-input";
import { UpdateCardsInput } from "../dtos/inputs/update-cards-input";
import { Card } from "../dtos/models/card-model";
import { EnsureAuthenticated } from "../middlewares/ensure-authenticated";
import { EnsureRegistered } from "../middlewares/ensure-registered";
import { AddCardToCollectionUseCase } from "../modules/collection/use-cases/add-card/add-card-use-case";
import { UpdateCardsUseCase } from "../modules/collection/use-cases/update-cards/update-cards-use-case";
import { Context } from "../types/context";

@Service()
@Resolver()
export class CollectionResolver{

  constructor(
    @Inject()
    private addCardToCollectionUseCase: AddCardToCollectionUseCase,
    @Inject()
    private updateCardsUseCase: UpdateCardsUseCase
  ){}

  @Mutation(() => Card)
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
  async addCard(
    @Arg('data') data: AddCardInput,
    @Ctx() ctx: Context
  ){
    const {cardId,quantity} = data
    const {user} = ctx
    return await this.addCardToCollectionUseCase.execute({
      quantity,
      scryfallCardId: cardId,
      userId: user.id
    })
  }

  @Mutation(() => [Card])
  @UseMiddleware(EnsureAuthenticated, EnsureRegistered)
  async updateCards(
    @Arg('data', type => [UpdateCardsInput]) data: [UpdateCardsInput],
    @Ctx() ctx: Context
  ){
    return this.updateCardsUseCase.execute({
      userId: ctx.user.id,
      cards: data
    }) 
  }

}