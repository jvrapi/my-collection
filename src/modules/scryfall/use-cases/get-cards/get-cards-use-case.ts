import { Inject, Service } from 'typedi';
import { ApiError } from '../../../../errors/Error';
import { Types } from '../../../../types/card-types';
import { Card, ScryfallRepository } from '../../repositories/scryfall-repository';

interface GetCardsFilters {
  name?: string,
  setCode?: string,
  cardType?: Types[]
}

@Service()
export class GetCardsUseCase {
  constructor(
    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
  ) {}

  async execute({ name, setCode, cardType }: GetCardsFilters) {
    if (!name && !setCode && !cardType) {
      throw new ApiError('You need to provide an filter');
    }

    let cards: Card[] = [];

    if (name) {
      cards = await this.scryfallRepository.findCardsByName(name);
    } else if (setCode) {
      cards = await this.scryfallRepository.findCardsBySetCode(setCode);
    } else if (cardType) {
      cards = await this.scryfallRepository.findCardsByCardType(cardType);
    }

    return cards;
  }
}
