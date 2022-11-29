import { Cards as Scryfall } from 'scryfall-sdk';
import { Card, ScryfallRepository } from "./scryfall-repository";
export class SdkScryfallRepository implements ScryfallRepository {
  async findCardById(id: string): Promise<Card | null> {
    try {
      const card = await Scryfall.byId(id)
      return {
        id: card.id,
        imageUrl: card.image_uris?.small as string
      }
    } catch (error) {
      return null    
    }
  
  }
}