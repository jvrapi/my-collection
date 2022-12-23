import { randomUUID } from 'node:crypto';
import { Set, Card } from '../../modules/scryfall/repositories/scryfall-repository';

export const scryfallSet: Set = {
  id: randomUUID(),
  iconUrl: 'http://test@example.com',
  name: 'Example set',
  code: 'ES',
  releasedAt: new Date().toISOString().split('T')[0]
};

export const scryfallCard: Card = {
  id: randomUUID(),
  imageUrl: 'http://test@example.com',
  name: 'Example card',
  setId: scryfallSet.id,
  type: 'artifact'
};
