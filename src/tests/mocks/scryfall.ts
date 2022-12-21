import { randomUUID } from 'node:crypto';

export const scryfallCard = {
  id: randomUUID(),
  imageUrl: 'http://test@example.com',
  name: 'Example card',
};

export const scryfallSet = {
  id: randomUUID(),
  iconUrl: 'http://test@example.com',
  name: 'Example set',
  code: 'ES',
  releasedAt: new Date().toISOString().split('T')[0]
};
