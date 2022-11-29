import { Cards as Scryfall } from 'scryfall-sdk';
import { Card, ScryfallRepository } from "./scryfall-repository";
export class SdkScryfallRepository implements ScryfallRepository {
  async findCardById(id: string): Promise<Card | null> {
    const card = await Scryfall.byId(id)

    if(!card){
      return null
    }

    return {
      id: card.id,
      imageUrl: card.image_uris?.small as string
    }
  }
}