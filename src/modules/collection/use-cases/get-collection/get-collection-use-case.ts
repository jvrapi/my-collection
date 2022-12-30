import { Inject, Service } from 'typedi';
import { PaginationProvider } from '../../../../providers/pagination/pagination-provider';
import { ScryfallRepository } from '../../../scryfall/repositories/scryfall-repository';
import { CollectionsRepository } from '../../repositories/collections-repository';

interface GetUserCollectionRequest {
  userId: string
  page: number
  limit: number
}

interface Card {
  id:string
  quantity:number
  imageUrl:string
  addedAt:Date
  updatedAt:Date
  name:string
}

@Service()
export class GetCollectionUseCase {
  constructor(
    @Inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,

    @Inject('PaginationProvider')
    private pagination: PaginationProvider
  ) {}

  async execute({ userId, limit, page }: GetUserCollectionRequest) {
    const userCollection = await this.collectionsRepository.findCollectionByUserId({ userId, limit, page });

    let cards: Card[] = [];
    if (userCollection?.card?.length === 0) {
      cards = [];
    }

    const countCardsInCollection = await this.collectionsRepository.countCardsInUserCollection(userId);

    await Promise.all(userCollection!.card!.map(async (card) => {
      const scryfallCard = await this.scryfallRepository.findCardById(card.scryfallId);

      if (scryfallCard) {
        cards.push({
          id: card.scryfallId,
          quantity: card.quantity,
          imageUrl: scryfallCard.imageUrl!,
          addedAt: card.addedAt,
          updatedAt: card.updatedAt,
          name: scryfallCard?.name,
        });
      }
    }));

    const cardsPaginated = this.pagination.getDataPaginated({
      data: cards,
      limit,
      page,
      dataTotalLength: countCardsInCollection
    });

    return cardsPaginated;
  }
}
