import { Collection as CollectionModel } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { Collection, CollectionsRepository } from './collections-repository';

export class PrismaCollectionsRepository implements CollectionsRepository {
  async findCollectionByUserId(userId: string): Promise<Collection | null> {
    return prisma.collection.findUnique({
      where: {
        userId,
      },
      include: {
        card: true,
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
}
