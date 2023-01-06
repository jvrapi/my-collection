enum SetType {
  core = 0,
  expansion = 1,
  masters = 2,
  masterpiece = 3,
  from_the_vault = 4,
  spellbook = 5,
  premium_deck = 6,
  duel_deck = 7,
  draft_innovation = 8,
  treasure_chest = 9,
  commander = 10,
  planechase = 11,
  archenemy = 12,
  vanguard = 13,
  funny = 14,
  starter = 15,
  box = 16,
  promo = 17,
  token = 18,
  memorabilia = 19
}

export interface Set {
  id: string;
  code: string;
  mtgo_code?: string | null;
  tcgplayer_id?: number | null;
  name: string;
  set_type: keyof typeof SetType;
  released_at?: string | null;
  block_code?: string | null;
  block?: string | null;
  parent_set_code?: string | null;
  card_count: number;
  digital: boolean;
  foil_only: boolean;
  scryfall_uri: string;
  uri: string;
  icon_svg_uri: string;
  search_uri: string;
}
