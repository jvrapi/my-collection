import { Card, ScryfallRepository } from './scryfall-repository';

export class InMemoryScryfallRepository implements ScryfallRepository {
  private cards: Card[] = [];

  constructor({ id, imageUrl, name }: Card) {
    this.cards.push({ id, imageUrl, name });
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) || null;
  }

  async findCardsByName(name: string): Promise<Card[]> {
    return this.cards
      .filter((card) => card.name.toLowerCase().includes(name.toLowerCase()));
  }
}
