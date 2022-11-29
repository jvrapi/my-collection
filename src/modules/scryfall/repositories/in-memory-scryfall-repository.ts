import { Card, ScryfallRepository } from "./scryfall-repository";

export class InMemoryScryfallRepository implements ScryfallRepository{
  private cards: Card[] = []

  constructor({id, imageUrl}: Card){
    this.cards.push({id, imageUrl})
  }

  async findCardById(id: string): Promise<Card | null> {
    const card= this.cards.find(card => card.id === id)
    
    if(card){
      return card
    }

    return null
  
  }

}