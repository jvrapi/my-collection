import { Card } from "@prisma/client"

export interface FindByCardIdAndCollectionId {
  collectionId: string
  scryfallCardId: string
}

export interface AddCard {
  collectionId: string
  scryfallCardId: string
  quantity: number
}

export type SaveCard = AddCard

export interface CardsRepository {
  findByCardIdAndCollectionId({scryfallCardId, collectionId}: FindByCardIdAndCollectionId): Promise<Card | null>
  addCard({collectionId, scryfallCardId, quantity}: AddCard): Promise<Card>
  saveCard({collectionId, scryfallCardId, quantity}: SaveCard): Promise<Card>
}