import { randomUUID } from "node:crypto";
import { InMemoryCardsRepository } from "../../cards/repository/in-memory-collections-repository";
import { Collection, CollectionsRepository } from "./collections-repository";

export class InMemoryCollectionsRepository implements CollectionsRepository {
  
  private collections: Collection[] = []
  
  constructor(private cardsRepository: InMemoryCardsRepository){}

 
  async findCollectionByUserId(userId: string): Promise<Collection | null> {
    const collection = this.collections.find(collection => collection.userId === userId) || null
  
    if(collection){
      collection.card = await this.cardsRepository.findByCollectionId(collection.id)
    }
    return collection
  }

  async create(userId:string):Promise<Collection>{
    const collection = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: false,
      userId,
    }
    
    this.collections.push(collection)

    return collection
  }

}