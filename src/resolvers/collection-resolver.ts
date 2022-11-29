import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { AddCardToCollectionInput } from "../dtos/inputs/add-card-to-collection-input";
import { Card } from "../dtos/models/card-model";
import { EnsureAuthenticated } from "../middlewares/ensure-authenticated";
import { AddCardToCollectionUseCase } from "../modules/collection/use-cases/add-card-to-collection-use-case";
import { Context } from "../types/context";

@Service()
@Resolver()
export class CollectionResolver{

  constructor(
    @Inject()
    private addCardToCollectionUseCase: AddCardToCollectionUseCase
  ){}

  @Mutation(() => Card)
  @UseMiddleware(EnsureAuthenticated)
  async addCardToCollection(
    @Arg('data') data: AddCardToCollectionInput,
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
}