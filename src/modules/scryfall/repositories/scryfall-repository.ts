import { Types } from '../../../types/card-types';

export interface Card {
  id: string
  imageUrl?: string
  name: string
  setId: string
  type: string
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
  findCardsBySetCode(setCode: string):Promise<Card[]>
  findCardsByCardType(types: Types[]): Promise<Card[]>
  getSets(): Promise<Set[]>
}
