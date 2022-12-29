import { Card as ScryfallCard } from '../modules/scryfall/types/card';
import { Card } from '../modules/scryfall/repositories/scryfall-repository';

export class CardMapper {
  static toDomain(card: ScryfallCard): Card {
    return {
      id: card.id,
      imageUrl: card.image_uris?.png ?? card.card_faces[0].image_uris?.png,
      name: card.name,
      setId: card.set_id,
      type: card.type_line
    };
  }
}
