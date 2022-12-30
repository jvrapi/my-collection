import { CardMapper } from '../../../mappers/card-mapper';
import { SetMapper } from '../../../mappers/set-mapper';
import { Types } from '../../../types/card-types';
import { api } from '../axios/axios-config';
import { ScryReturn } from '../types/return';
import { Card as ScryCard } from '../types/card';
import { Set as ScrySet } from '../types/set';
import {
  Card, CardsList, ScryfallRepository, Set
} from './scryfall-repository';

export class ApiScryfallRepository implements ScryfallRepository {
  async findCardsByName(name: string): Promise<CardsList> {
    const { data: cards } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: `!${name}`,
      }
    });

    return {
      ...cards,
      data: cards.data.map(CardMapper.toDomain)
    };
  }

  async findCardsByCardType(types: Types[], page: number): Promise<CardsList> {
    const typesAsString = types.map((type) => `t:${type}`).join(' ');
    const { data: cards } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: typesAsString,
        page
      }
    });
    return {
      ...cards,
      data: cards.data.map(CardMapper.toDomain)
    };
  }

  async findCardsBySetCode(setCode: string): Promise<CardsList> {
    const { data: cards } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: `s:${setCode}`,
        order: 'set'
      }
    });
    return {
      ...cards,
      data: cards.data.map(CardMapper.toDomain)
    };
  }

  async findCardById(id: string): Promise<Card | null> {
    try {
      const { data: scryfallCard } = await api.get<ScryCard>(`/cards/${id}`);
      return CardMapper.toDomain(scryfallCard);
    } catch (error) {
      return null;
    }
  }

  async getRandomCards(): Promise<CardsList> {
    const { data: cards } = await api.get<ScryReturn<ScryCard>>('/cards/search', {
      params: {
        q: `year=${new Date().getFullYear()}`,
        order: 'released'
      }
    });

    return {
      ...cards,
      data: cards.data.map(CardMapper.toDomain)
    };
  }

  async getSets(): Promise<Set[]> {
    const { data: sets } = await api.get<ScryReturn<ScrySet>>('/sets');

    return sets.data.map(SetMapper.toDomain);
  }
}
