import { Cards as ScryfallCards, Sets as ScryfallSets } from 'scryfall-sdk';
import { CardMapper } from '../../../mappers/card-mapper';
import { SetMapper } from '../../../mappers/set-mapper';
import { Types } from '../../../types/card-types';
import {
  Card, ScryfallRepository, Set
} from './scryfall-repository';

export class SdkScryfallRepository implements ScryfallRepository {
  async findCardsByName(name: string): Promise<Card[]> {
    const autocompleteCards = await ScryfallCards.autoCompleteName(name);

    const cards = await Promise.all(autocompleteCards.map(async (cardName) => {
      const scryfallCard = await ScryfallCards.byName(cardName);
      return CardMapper.toDomain(scryfallCard);
    }));
    return cards;
  }

  findCardsByCardType(types: Types[]): Promise<Card[]> {
    return new Promise<Card[]>((resolve, reject) => {
      const typesAsString = types.map((type) => `t:${type}`).join(' ');
      const cards: Card[] = [];
      ScryfallCards.search(typesAsString)
        .on('data', (card) => cards.push(CardMapper.toDomain(card)))
        .on('error', (err) => console.log(err))
        .on('done', () => resolve(cards));
    });
  }

  async findCardsBySetCode(setCode: string): Promise<Card[]> {
    const set = await ScryfallSets.byCode(setCode);
    const cards = await set.getCards();
    return cards.map(CardMapper.toDomain);
  }

  async findCardById(id: string): Promise<Card | null> {
    try {
      const scryfallCard = await ScryfallCards.byId(id);
      return CardMapper.toDomain(scryfallCard);
    } catch (error) {
      return null;
    }
  }

  async getSets(): Promise<Set[]> {
    const sets = await ScryfallSets.all();

    return sets.map(SetMapper.toDomain);
  }
}
