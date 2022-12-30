import { Inject, Service } from 'typedi';
import { ApiError } from '../../../../errors/Error';
import { CardsRepository } from '../../../cards/repository/cards-repository';
import { ScryfallRepository } from '../../../scryfall/repositories/scryfall-repository';
import { CollectionsRepository } from '../../repositories/collections-repository';

interface AddCard {
  quantity: number
  scryfallCardId: string
  userId: string
}

@Service()
export class AddCardToCollectionUseCase {
  constructor(
    @Inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @Inject('CardsRepository')
    private cardsRepository: CardsRepository,

    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
  ) {}

  async execute({ quantity, scryfallCardId, userId }: AddCard) {
    if (!quantity || quantity === 0) {
      throw new ApiError('You need to provide an quantity');
    }

    if (!scryfallCardId) {
      throw new ApiError('You need to provide an card');
    }

    const scryfallCard = await this.scryfallRepository.findCardById(scryfallCardId);

    if (!scryfallCard) {
      throw new ApiError('Invalid card');
    }

    const userCollection = await this.collectionsRepository.findCollectionByUserId({ userId, page: 1, limit: 1 });

    const cardAlreadyInCollection = await this.cardsRepository.findByCardIdAndCollectionId({
      scryfallCardId,
      collectionId: userCollection!.id,
    });

    if (cardAlreadyInCollection) {
      throw new ApiError('This card already in your collection');
    }

    const card = await this.cardsRepository.addCard({
      quantity,
      scryfallCardId,
      collectionId: userCollection!.id,
    });

    return {
      id: card.scryfallId,
      imageUrl: scryfallCard.imageUrl,
      quantity: card.quantity,
      addedAt: card.addedAt,
      updatedAt: card.updatedAt,
    };
  }
}
