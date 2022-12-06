import { Card } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import {
  AddCard, CardsRepository, FindByCardIdAndCollectionId, SaveCard,
} from './cards-repository';

export class PrismaCardsRepository implements CardsRepository {
  findByCardIdAndCollectionId({ scryfallCardId, collectionId }: FindByCardIdAndCollectionId): Promise<Card | null> {
    return prisma.card.findUnique({
      where: {
        scryfallId_collectionId: {
          collectionId,
          scryfallId: scryfallCardId,
        },
      },
    });
  }

  addCard({ collectionId, scryfallCardId, quantity }: AddCard): Promise<Card> {
    return prisma.card.create({
      data: {
        collectionId,
        scryfallId: scryfallCardId,
        quantity,
      },
    });
  }

  saveCard({ collectionId, scryfallCardId, quantity }: SaveCard): Promise<Card> {
    return prisma.card.update({
      where: {
        scryfallId_collectionId: {
          scryfallId: scryfallCardId,
          collectionId,
        },
      },
      data: {
        quantity,
        updatedAt: new Date(),
      },
    });
  }
}
