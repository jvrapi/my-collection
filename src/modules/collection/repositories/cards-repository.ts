import { Card } from '@prisma/client'

export interface AddCard {
  userId: string
  scryfallCardId: string
  quantity: number
}

export interface CardsRepository {
  addCard({userId, scryfallCardId, quantity}: AddCard): Promise<Card>
}