import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetCardsFilters } from '../dtos/inputs/get-cards-input';
import { ScryfallCardModel } from '../dtos/models/scryfall-card-model';
import { GetCardsUseCase } from '../modules/scryfall/use-cases/get-cards/get-cards-use-case';

@Service()
@Resolver()
export class CardResolver {
  constructor(
    @Inject()
    private getCardsUseCase: GetCardsUseCase,
  ) {}

  @Query(() => [ScryfallCardModel])
  async cards(@Arg('data') { name, setCode, cardType }: GetCardsFilters) {
    return this.getCardsUseCase.execute({
      name,
      setCode,
      cardType
    });
  }
}
