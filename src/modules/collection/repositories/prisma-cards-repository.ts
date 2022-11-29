import { Card } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import { AddCard, CardsRepository } from "./cards-repository";

export class PrismaCardsRepository implements CardsRepository{
  addCard({ userId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    return prisma.card.create({
      data: {
        userId,
        scryfallId: scryfallCardId,
        quantity 
      }
    })
  }

}