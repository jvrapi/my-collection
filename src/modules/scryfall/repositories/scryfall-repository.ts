export interface Card {
  id: string
  imageUrl: string
  name: string
}

export interface Set {
  id: string
  name: string
  code: string
  releasedAt: string
  iconUrl: string
}

export interface ScryfallRepository {
  findCardById(id: string): Promise<Card | null>
  findCardsByName(name:string): Promise<Card[]>
  getSets(): Promise<Set[]>
}
