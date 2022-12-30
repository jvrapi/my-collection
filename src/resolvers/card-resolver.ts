import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetCardsInput } from '../modules/scryfall/dtos/inputs/get-cards-input';
import { Cards } from '../modules/scryfall/dtos/models/cards-model';
import { GetCardsUseCase } from '../modules/scryfall/use-cases/get-cards/get-cards-use-case';

@Service()
@Resolver()
export class CardResolver {
  constructor(
    @Inject()
    private getCardsUseCase: GetCardsUseCase,
  ) {}

  @Query(() => Cards)
  async cards(@Arg('data') {
    name, setCode, cardType, page
  }: GetCardsInput) {
    const data = await this.getCardsUseCase.execute({
      name,
      setCode,
      cardType,
      page
    });

    return data;
  }
}
