import { randomUUID } from 'node:crypto';
import { InMemoryCardsRepository } from '../../cards/repository/in-memory-collections-repository';
import { Collection, CollectionsRepository, FindCollectionByUserId } from './collections-repository';

export class InMemoryCollectionsRepository implements CollectionsRepository {
  private collections: Collection[] = [];

  constructor(private cardsRepository: InMemoryCardsRepository) {}

  async findCollectionByUserId({ userId }: FindCollectionByUserId): Promise<Collection | null> {
    const userCollection = this.collections.find(
      (collection) => collection.userId === userId,
    ) || null;

    if (userCollection) {
      userCollection.card = await this.cardsRepository.findByCollectionId(userCollection.id);
    }
    return userCollection;
  }

  async create(userId:string):Promise<Collection> {
    const collection = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: false,
      userId,
    };

    this.collections.push(collection);

    return collection;
  }

  async countCardsInUserCollection(userId: string): Promise<number> {
    const collection = this.collections.find((item) => item.userId === userId);
    if (collection) {
      const count = collection.card!.length;
      return count;
    }
    return 0;
  }
}
