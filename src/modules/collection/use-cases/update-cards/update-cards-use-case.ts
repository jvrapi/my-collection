import { Inject, Service } from 'typedi';
import { ApiError } from '../../../../errors/Error';
import { CardsRepository } from '../../../cards/repository/cards-repository';
import { ScryfallRepository } from '../../../scryfall/repositories/scryfall-repository';
import { CollectionsRepository } from '../../repositories/collections-repository';

interface Card {
  cardId: string,
  quantity: number
}

interface UpdateCards {
  userId: string,
  cards: Card[]
}

@Service()
export class UpdateCardsUseCase {
  constructor(
    @Inject('CardsRepository')
    private cardsRepository: CardsRepository,

    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,

    @Inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute({ userId, cards }: UpdateCards) {
    if (cards?.length === 0) {
      throw new ApiError('You need to provide at least an card to be updated');
    }

    const userCollection = await this.collectionsRepository.findCollectionByUserId({ userId, page: 1, limit: 1 });

    await Promise.all(cards.map(async (card) => {
      const cardInCollection = await this.cardsRepository.findByCardIdAndCollectionId({
        collectionId: userCollection!.id,
        scryfallCardId: card.cardId,
      });

      if (!cardInCollection) {
        throw new ApiError('Some card is not in collection');
      }
    }));

    const cardsUpdated = await Promise.all(cards.map(async ({ cardId, quantity }) => {
      const card = await this.cardsRepository.saveCard({
        quantity,
        scryfallCardId: cardId,
        collectionId: userCollection!.id
      });
      const scryfallCard = await this.scryfallRepository.findCardById(cardId);

      return {
        id: card.scryfallId,
        quantity: card.quantity,
        addedAt: card.addedAt,
        updatedAt: card.updatedAt,
        imageUrl: scryfallCard?.imageUrl,
      };
    }));

    return cardsUpdated;
  }
}
