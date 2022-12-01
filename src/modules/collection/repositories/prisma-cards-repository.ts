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

  saveCard({ userId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    return prisma.card.update({
      where: {
        scryfallId_userId: {
          scryfallId: scryfallCardId,
          userId
        }
      },
      data: {
        quantity
      }
    })
  }

  findByCardIdAndUserId({ scryfallCardId, userId }: FindByCardIdAndUserId): Promise<Card | null> {
    return prisma.card.findUnique({
      where: {
        scryfallId_userId:{
          scryfallId: scryfallCardId,
          userId
        }
      }
    })
  }

  findCardsByUserId(userId: string): Promise<Card[]> {
    return prisma.card.findMany({
      where: {
        userId
      }
    })
  }

}