import { Types } from '../../../types/card-types';
import { ScryReturn } from '../types/return';

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

export type CardsList = ScryReturn<Card>;

export interface ScryfallRepository {
  findCardById(id: string): Promise<Card | null>
  findCardsByName(name:string): Promise<CardsList>
  findCardsBySetCode(setCode: string, page: number):Promise<CardsList>
  findCardsByCardType(types: Types[], page: number): Promise<CardsList>
  getRandomCards(): Promise<CardsList>
  getSets(): Promise<Set[]>
}
