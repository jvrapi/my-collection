import { Card as ScryfallCard } from 'scryfall-sdk';
import { Card } from '../modules/scryfall/repositories/scryfall-repository';

export class CardMapper {
  static toDomain(card: ScryfallCard): Card {
    return {
      id: card.id,
      imageUrl: card.getImageURI('png'),
      name: card.name,
      setId: card.set_id,
      type: card.type_line
    };
  }
}
