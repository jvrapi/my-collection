import { Set as ScryfallSet } from '../modules/scryfall/types/set';
import { Set } from '../modules/scryfall/repositories/scryfall-repository';

export class SetMapper {
  static toDomain(set: ScryfallSet): Set {
    return {
      id: set.id,
      name: set.name,
      code: set.code,
      releasedAt: set.released_at as string,
      iconUrl: set.icon_svg_uri
    };
  }
}
