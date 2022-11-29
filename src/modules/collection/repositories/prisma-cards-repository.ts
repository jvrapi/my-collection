import { Card } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import { AddCard, CardsRepository, FindByCardIdAndUserId } from "./cards-repository";

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

  findByCardIdAndUserId({ scryfallCardId, userId }: FindByCardIdAndUserId): Promise<Card | null> {
    return prisma.card.findFirst({
      where: {
        scryfallId: scryfallCardId,
        userId
      }
    })
  }

}