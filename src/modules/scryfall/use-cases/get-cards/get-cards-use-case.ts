import { Inject, Service } from 'typedi';
import { PaginationProvider } from '../../../../providers/pagination/pagination-provider';
import { Types } from '../../../../types/card-types';
import { CardsList, ScryfallRepository } from '../../repositories/scryfall-repository';

interface GetCardsFilters {
  name?: string,
  setCode?: string,
  cardType?: Types[],
  page: number
}

@Service()
export class GetCardsUseCase {
  constructor(
    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
    @Inject('PaginationProvider')
    private pagination: PaginationProvider
  ) {}

  async execute({
    name, setCode, cardType, page
  }: GetCardsFilters) {
    let cards: CardsList = await this.scryfallRepository.getRandomCards();

    if (name) {
      cards = await this.scryfallRepository.findCardsByName(name, page);
    } else if (setCode) {
      cards = await this.scryfallRepository.findCardsBySetCode(setCode, page);
    } else if (cardType) {
      cards = await this.scryfallRepository.findCardsByCardType(cardType, page);
    }

    const cardsPaginated = this.pagination.getDataPaginated({
      data: cards.data,
      dataTotalLength: cards.total_cards ?? 0,
      limit: 175,
      page
    });
    return cardsPaginated;
  }
}
