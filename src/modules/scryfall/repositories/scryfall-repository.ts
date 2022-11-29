export interface Card {
  id: string
  imageUrl: string
}

export interface ScryfallRepository {
  findCardById(id: string): Promise<Card | null>
}