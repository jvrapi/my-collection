import { Card } from '@prisma/client'

export interface AddCard {
  userId: string
  scryfallCardId: string
  quantity: number
}

export type SaveCard = AddCard

export interface FindByCardIdAndUserId {
  userId: string
  scryfallCardId: string
}

export interface CardsRepository {
  addCard({userId, scryfallCardId, quantity}: AddCard): Promise<Card>
  findByCardIdAndUserId({scryfallCardId, userId}: FindByCardIdAndUserId): Promise<Card | null>
  saveCard({userId, scryfallCardId, quantity}: SaveCard): Promise<Card>
}