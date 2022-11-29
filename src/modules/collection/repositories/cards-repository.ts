import { Card } from '@prisma/client'

export interface AddCard {
  userId: string
  scryfallCardId: string
  quantity: number
}

export interface FindByCardIdAndUserId {
  userId: string
  scryfallCardId: string
}

export interface CardsRepository {
  addCard({userId, scryfallCardId, quantity}: AddCard): Promise<Card>
  findByCardIdAndUserId({scryfallCardId, userId}: FindByCardIdAndUserId): Promise<Card | null>
}