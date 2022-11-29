import { Card } from "@prisma/client";
import { AddCard, CardsRepository, FindByCardIdAndUserId } from "./cards-repository";

export class InMemoryCardsRepository implements CardsRepository {
  private cards: Card[] = []
  
  async addCard({ userId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    const card: Card = {
      userId,
      scryfallId: scryfallCardId,
      quantity,
      addedAt: new Date(),
      updatedAt: new Date()
    }

    this.cards.push(card)

    return card
  }

  async findByCardIdAndUserId({ scryfallCardId, userId }: FindByCardIdAndUserId): Promise<Card | null> {
    const card = this.cards.find(card => card.scryfallId === scryfallCardId && card.userId === userId) || null

    return card
  }

}