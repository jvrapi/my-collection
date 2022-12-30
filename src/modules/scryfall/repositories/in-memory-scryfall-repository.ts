import { Types } from '../../../types/card-types';
import {
  Card, CardsList, ScryfallRepository, Set
} from './scryfall-repository';

export class InMemoryScryfallRepository implements ScryfallRepository {
  private cards: Card[] = [];

  private sets: Set[] = [];

  constructor(card: Card, set: Set) {
    this.cards.push(card);
    this.sets.push(set);
  }

  private buildCardReturn(data: Card[]): CardsList {
    return {
      data,
      has_more: false,
      next_page: null,
      object: 'list',
      total_cards: this.cards.length,
      total_values: null
    };
  }

  async findCardsByCardType(types: Types[]): Promise<CardsList> {
    const cards = this.cards.filter(
      (card) => types.some(
        (type) => card.type.toLowerCase().includes(type.toLowerCase())
      )
    );
    return this.buildCardReturn(cards);
  }

  async findCardsBySetCode(setCode: string): Promise<CardsList> {
    const set = this.sets.find((item) => item.code === setCode);
    const cards = this.cards.filter((card) => card.setId === set?.id);
    return this.buildCardReturn(cards);
  }

  async findCardsByName(name: string): Promise<CardsList> {
    const cards = this.cards
      .filter((card) => card.name.toLowerCase().includes(name.toLowerCase()));
    return this.buildCardReturn(cards);
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) || null;
  }

  async getRandomCards(): Promise<CardsList> {
    return this.buildCardReturn(this.cards);
  }

  async getSets(): Promise<Set[]> {
    return this.sets;
  }
}
