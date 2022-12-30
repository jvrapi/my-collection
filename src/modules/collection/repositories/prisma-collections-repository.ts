import { Collection as CollectionModel } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { Collection, CollectionsRepository, FindCollectionByUserId } from './collections-repository';

export class PrismaCollectionsRepository implements CollectionsRepository {
  async findCollectionByUserId({ userId, limit, page }:FindCollectionByUserId): Promise<Collection | null> {
    return prisma.collection.findUnique({
      where: {
        userId,
      },
      include: {
        card: {
          take: limit,
          skip: (page - 1) * limit,
        },
      },
    });
  }

  create(userId: string): Promise<CollectionModel> {
    return prisma.collection.create({
      data: {
        userId,
      },
    });
  }

  countCardsInUserCollection(userId: string): Promise<number> {
    return prisma.collection.count({
      where: {
        userId
      }
    });
  }
}
