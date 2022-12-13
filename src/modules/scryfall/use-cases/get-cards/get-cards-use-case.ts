import { Inject, Service } from 'typedi';
import { ApiError } from '../../../../errors/Error';
import { ScryfallRepository } from '../../repositories/scryfall-repository';

interface GetCardsFilters {
  name: string
}

@Service()
export class GetCardsUseCase {
  constructor(
    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
  ) {}

  async execute({ name }: GetCardsFilters) {
    if (!name) {
      throw new ApiError('You need to provide a card name');
    }

    const cards = await this.scryfallRepository.findCardsByName(name);

    return cards;
  }
}
