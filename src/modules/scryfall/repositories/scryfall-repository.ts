export interface Card {
  id: string
  imageUrl: string
  name: string
}

export interface ScryfallRepository {
  findCardById(id: string): Promise<Card | null>
  findCardsByName(name:string): Promise<Card[]>
}
