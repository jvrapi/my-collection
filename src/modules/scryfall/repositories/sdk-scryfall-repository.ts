import { Cards as ScryfallCards, Sets as ScryfallSets } from 'scryfall-sdk';
import { Card, ScryfallRepository, Set } from './scryfall-repository';

export class SdkScryfallRepository implements ScryfallRepository {
  async findCardsByName(name: string): Promise<Card[]> {
    const autocompleteCards = await ScryfallCards.autoCompleteName(name);

    const cards = await Promise.all(autocompleteCards.map(async (cardName) => {
      const scryfallCard = await ScryfallCards.byName(cardName);
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
      const card = await ScryfallCards.byId(id);
      return {
        id: card.id,
        imageUrl: card.image_uris?.large as string,
        name: card.name,
      };
    } catch (error) {
      return null;
    }
  }

  async getSets(): Promise<Set[]> {
    const sets = await ScryfallSets.all();

    const setsFormatted = sets.map((set) => {
      const setFormatted = {
        id: set.id,
        name: set.name,
        code: set.code,
        releasedAt: set.released_at as string,
        iconUrl: set.icon_svg_uri
      };
      return setFormatted;
    });

    return setsFormatted;
  }
}
