import { CardMapper } from '../../../mappers/card-mapper';
import { SetMapper } from '../../../mappers/set-mapper';
import { Types } from '../../../types/card-types';
import { api } from '../axios/axios-config';
import { ScryReturn } from '../types/return';
import { Card as ScryCard } from '../types/card';
import { Set as ScrySet } from '../types/set';
import {
  Card, ScryfallRepository, Set
} from './scryfall-repository';

export class SdkScryfallRepository implements ScryfallRepository {
  async findCardsByName(name: string): Promise<Card[]> {
    try {
      const { data: autocompleteCards } = await api.get<ScryReturn<string>>('/cards/autocomplete', {
        params: {
          q: name
        }
      });

      const cards = await Promise.all(autocompleteCards.data.map(async (cardName) => {
        const { data: scryCard } = await api.get<ScryCard>('/cards/named', {
          params: {
            exact: cardName
          }
        });
        return CardMapper.toDomain(scryCard);
      }));
      return cards;
    } catch (error) {
      return [];
    }
  }

  async findCardsByCardType(types: Types[]): Promise<Card[]> {
    const typesAsString = types.map((type) => `t:${type}`).join(' ');
    const { data: cards } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: typesAsString
      }
    });
    return cards.data.map(CardMapper.toDomain);
  }

  async findCardsBySetCode(setCode: string): Promise<Card[]> {
    const { data: set } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: `s:${setCode}`,
        order: 'set'
      }
    });
    return set.data.map(CardMapper.toDomain);
  }

  async findCardById(id: string): Promise<Card | null> {
    try {
      const { data: scryfallCard } = await api.get<ScryCard>(`/cards/${id}`);
      return CardMapper.toDomain(scryfallCard);
    } catch (error) {
      return null;
    }
  }

  async getSets(): Promise<Set[]> {
    const { data: sets } = await api.get<ScryReturn<ScrySet>>('/sets');

    return sets.data.map(SetMapper.toDomain);
  }
}
