import { Card } from '@prisma/client';
import { AddCard, CardsRepository, FindByCardIdAndCollectionId } from './cards-repository';

export class InMemoryCardsRepository implements CardsRepository {
  private cards: Card[] = [];

  async findByCardIdAndCollectionId({ scryfallCardId, collectionId }: FindByCardIdAndCollectionId): Promise<Card | null> {
    const card = this.cards.find((card) => card.scryfallId === scryfallCardId && card.collectionId === collectionId) || null;

    return card;
  }

  async addCard({ collectionId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    const card: Card = {
      collectionId,
      scryfallId: scryfallCardId,
      quantity,
      addedAt: new Date(),
      updatedAt: new Date(),
    };

    this.cards.push(card);

    return card;
  }

  async saveCard({ collectionId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    const cardIndex = this.cards.findIndex((card) => card.collectionId === collectionId && card.scryfallId === scryfallCardId);

    this.cards[cardIndex].quantity = quantity;

    return this.cards[cardIndex];
  }

  async findByCollectionId(collectionId: string): Promise<Card[]> {
    return this.cards.filter((card) => card.collectionId === collectionId);
  }
}
