import { Card, Collection as CollectionModel } from '@prisma/client';

export type Collection = CollectionModel & {
  card?: Card[]
};

export interface FindCollectionByUserId {
  userId: string;
  page: number;
  limit: number;
}

export interface CollectionsRepository {
  findCollectionByUserId({ userId, page, limit }:FindCollectionByUserId): Promise<Collection | null>
  create(userId: string): Promise<CollectionModel>
  countCardsInUserCollection(userId:string): Promise<number>
}
