import { Inject, Service } from 'typedi';
import { ScryfallRepository } from '../../../scryfall/repositories/scryfall-repository';
import { CollectionsRepository } from '../../repositories/collections-repository';

@Service()
export class GetCollectionUseCase {
  constructor(
    @Inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
  ) {}

  async execute(userId: string) {
    const userCollection = await this.collectionsRepository.findCollectionByUserId(userId);

    if (userCollection?.card?.length === 0) {
      return [];
    }

    const cards = Promise.all(userCollection!.card!.map(async (card) => {
      const scryfallCard = await this.scryfallRepository.findCardById(card.scryfallId);
      return {
        id: card.scryfallId,
        quantity: card.quantity,
        imageUrl: scryfallCard?.imageUrl,
        addedAt: card.addedAt,
        updatedAt: card.updatedAt,
        name: scryfallCard?.name,
      };
    }));

    return cards;
  }
}
