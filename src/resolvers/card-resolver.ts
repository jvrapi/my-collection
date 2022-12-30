import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetCardsFilters } from '../dtos/inputs/get-cards-input';
import { ScryfallPaginatedCardModel } from '../dtos/models/scryfall-paginated-card-model';
import { GetCardsUseCase } from '../modules/scryfall/use-cases/get-cards/get-cards-use-case';

@Service()
@Resolver()
export class CardResolver {
  constructor(
    @Inject()
    private getCardsUseCase: GetCardsUseCase,
  ) {}

  @Query(() => ScryfallPaginatedCardModel)
  async cards(@Arg('data') {
    name, setCode, cardType, page
  }: GetCardsFilters) {
    const data = await this.getCardsUseCase.execute({
      name,
      setCode,
      cardType,
      page
    });

    return data;
  }
}
