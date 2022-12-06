import { Card, Collection as CollectionModel } from '@prisma/client';

export type Collection = CollectionModel & {
  card?: Card[]
};

export interface CollectionsRepository {
  findCollectionByUserId(userId:string): Promise<Collection | null>
  create(userId: string): Promise<CollectionModel>
}
