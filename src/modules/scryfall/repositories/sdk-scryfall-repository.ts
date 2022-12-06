import { Cards as Scryfall } from 'scryfall-sdk';
import { Card, ScryfallRepository } from './scryfall-repository';

export class SdkScryfallRepository implements ScryfallRepository {
  async findCardsByName(name: string): Promise<Card[]> {
    const autocompleteCards = await Scryfall.autoCompleteName(name);

    const cards = await Promise.all(autocompleteCards.map(async (cardName) => {
      const scryfallCard = await Scryfall.byName(cardName);
      return {
        id: scryfallCard.id,
        imageUrl: scryfallCard.image_uris?.large as string,
        name: scryfallCard.name,
      };
    }));
    return cards;
  }

  async findCardById(id: string): Promise<Card | null> {
    try {
      const card = await Scryfall.byId(id);
      return {
        id: card.id,
        imageUrl: card.image_uris?.large as string,
        name: card.name,
      };
    } catch (error) {
      return null;
    }
  }
}
