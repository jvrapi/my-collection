import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetCardsFilters } from '../dtos/inputs/get-cards-input';
import { ScryfallCardModel } from '../dtos/models/scryfall-card-model';
import { GetCardsByNameUseCase } from '../modules/scryfall/use-cases/get-cards/get-cards-by-name-use-case';

@Service()
@Resolver()
export class CardResolver {
  constructor(
    @Inject()
    private getCardsByNameUseCase: GetCardsByNameUseCase,
  ) {}

  @Query(() => [ScryfallCardModel])
  async cards(@Arg('data') { name }: GetCardsFilters) {
    return this.getCardsByNameUseCase.execute({
      name,
    });
  }
}
