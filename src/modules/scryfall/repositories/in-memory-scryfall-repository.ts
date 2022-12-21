import { Card, ScryfallRepository, Set } from './scryfall-repository';

export class InMemoryScryfallRepository implements ScryfallRepository {
  private cards: Card[] = [];

  private sets: Set[] = [];

  constructor(card: Card, set: Set) {
    this.cards.push(card);
    this.sets.push(set);
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) || null;
  }

  async findCardsByName(name: string): Promise<Card[]> {
    return this.cards
      .filter((card) => card.name.toLowerCase().includes(name.toLowerCase()));
  }

  async getSets(): Promise<Set[]> {
    return this.sets;
  }
}
