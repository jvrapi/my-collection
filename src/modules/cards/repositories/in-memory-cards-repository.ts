import { Card } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { AddCard, CardsRepository } from "./cards-repository";

export class InMemoryCardsRepository implements CardsRepository {
  private cards: Card[] = []
  
  async addCard({ userId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    const card: Card = {
      id: randomUUID(),
      userId,
      scryfallId: scryfallCardId,
      quantity,
      addedAt: new Date(),
      updatedAt: new Date()
    }

    this.cards.push(card)

    return card
  }

}