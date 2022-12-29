import { Color } from './color';
import { Set } from './set';

declare const CardFrame: {
  '1993': number;
  '1997': number;
  '2003': number;
  '2015': number;
  Future: number;
};

enum RelatedCardComponent {
  token = 0,
  meld_part = 1,
  meld_result = 2,
  combo_piece = 3
}

enum Rarity {
  common = 0,
  uncommon = 1,
  rare = 2,
  special = 3,
  mythic = 4,
  bonus = 5
}

enum FrameEffect {
  legendary = 0,
  miracle = 1,
  nyxtouched = 2,
  draft = 3,
  devoid = 4,
  tombstone = 5,
  colorshifted = 6,
  inverted = 7,
  sunmoondfc = 8,
  compasslanddfc = 9,
  originpwdfc = 10,
  mooneldrazidfc = 11,
  moonreversemoondfc = 12,
  showcase = 13,
  extendedart = 14
}

enum Game {
  paper = 0,
  arena = 1,
  mtgo = 2
}

enum Legality {
  legal = 0,
  not_legal = 1,
  restricted = 2,
  banned = 3
}

enum Border {
  black = 0,
  borderless = 1,
  gold = 2,
  silver = 3,
  white = 4
}

enum Layout {
  normal = 0,
  split = 1,
  flip = 2,
  transform = 3,
  modal_dfc = 4,
  meld = 5,
  leveler = 6,
  saga = 7,
  adventure = 8,
  planar = 9,
  scheme = 10,
  vanguard = 11,
  token = 12,
  double_faced_token = 13,
  emblem = 14,
  augment = 15,
  host = 16,
  art_series = 17,
  double_sided = 18
}

enum Format {
  standard = 0,
  future = 1,
  historic = 2,
  pioneer = 3,
  modern = 4,
  legacy = 5,
  pauper = 6,
  vintage = 7,
  penny = 8,
  commander = 9,
  brawl = 10,
  duel = 11,
  oldschool = 12
}

enum CardFinish {
  foil = 0,
  nonfoil = 1,
  etched = 2,
  glossy = 3
}

enum PromoType {
  tourney = 0,
  prerelease = 1,
  datestamped = 2,
  planeswalkerdeck = 3,
  buyabox = 4,
  judgegift = 5,
  event = 6,
  convention = 7,
  starterdeck = 8,
  instore = 9,
  setpromo = 10,
  fnm = 11,
  openhouse = 12,
  league = 13,
  draftweekend = 14,
  gameday = 15,
  release = 16,
  intropack = 17,
  giftbox = 18,
  duels = 19,
  wizardsplaynetwork = 20,
  premiereshop = 21,
  playerrewards = 22,
  gateway = 23,
  arenaleague = 24
}

enum CardStatus {
  missing = 0,
  placeholder = 1,
  lowres = 2,
  highres_scan = 3
}

enum CardSecurityStamp {
  oval = 0,
  triangle = 1,
  acorn = 2,
  arena = 3
}

interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

interface RelatedCard {
  object: 'related_card';
  id: string;
  component: keyof typeof RelatedCardComponent;
  name: string;
  type_line: string;
  uri: string;
}

interface CardFace {
  object: 'card_face';
  artist?: string | null;
  cmc?: number | null;
  color_indicator?: Color[] | null;
  colors?: Color[] | null;
  flavor_text?: string | null;
  illustration_id?: string | null;
  image_uris?: ImageUris | null;
  layout?: string;
  loyalty?: string | null;
  mana_cost?: string | null;
  name: string;
  oracle_id?: string | null;
  oracle_text?: string | null;
  power?: string | null;
  printed_name?: string | null;
  printed_text?: string | null;
  printed_type_line?: string | null;
  toughness?: string | null;
  type_line: string;
  watermark?: string | null;
}

interface Prices {
  usd?: string | null;
  usd_foil?: string | null;
  usd_etched?: string | null;
  eur?: string | null;
  eur_foil?: string | null;
  tix?: string | null;
}

interface Preview {
  previewed_at?: string | null;
  source_uri?: string | null;
  source?: string | null;
}

interface PurchaseUris {
  tcgplayer?: string | null;
  cardmarket?: string | null;
  cardhoarder?: string | null;
  [key: string]: string | null | undefined;
}

interface RelatedUris {
  gatherer?: string | null;
  tcgplayer_decks?: string | null;
  tcgplayer_infinite_decks?: string | null;
  tcgplayer_infinite_articles?: string | null;
  edhrec?: string | null;
  mtgtop8?: string | null;
  [key: string]: string | null | undefined;
}

type Legalities = {
  [key in keyof typeof Format]: keyof typeof Legality;
};

type Modifier = `+${bigint}` | `-${bigint}`;

export interface Card {
  object: 'card';
  arena_id?: number | null;
  id: string;
  lang: string;
  mtgo_id?: number | null;
  mtgo_foil_id?: number | null;
  multiverse_ids?: number[] | null;
  tcgplayer_id?: number | null;
  tcgplayer_etched_id?: number | null;
  cardmarket_id?: number | null;
  oracle_id: string;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;
  all_parts?: RelatedCard[] | null;
  card_faces: CardFace[];
  cmc: number;
  color_identity: Color[];
  color_indicator?: Color[] | null;
  colors?: Color[] | null;
  edhrec_rank?: number | null;
  hand_modifier?: Modifier | null;
  keywords: string[];
  layout: keyof typeof Layout;
  legalities: Legalities;
  life_modifier?: Modifier | null;
  loyalty?: string | null;
  mana_cost?: string | null;
  name: string;
  oracle_text?: string | null;
  oversized: boolean;
  power?: string | null;
  produced_mana?: Color[] | null;
  reserved: boolean;
  toughness?: string | null;
  type_line: string;
  artist?: string | null;
  booster: boolean;
  border_color: keyof typeof Border;
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean | null;
  digital: boolean;
  finishes: (keyof typeof CardFinish)[];
  flavor_name?: string | null;
  flavor_text?: string | null;
  frame_effects?: (keyof typeof FrameEffect)[] | null;
  frame: keyof typeof CardFrame;
  full_art: boolean;
  games: (keyof typeof Game)[];
  highres_image: boolean;
  illustration_id?: string | null;
  image_status: keyof typeof CardStatus;
  image_uris?: ImageUris | null;
  prices: Prices;
  printed_name?: string | null;
  printed_text?: string | null;
  printed_type_line?: string | null;
  promo: boolean;
  promo_types?: (keyof typeof PromoType)[] | null;
  purchase_uris: PurchaseUris;
  rarity: keyof typeof Rarity;
  related_uris: RelatedUris;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: Set['set_type'];
  set_uri: string;
  set: string;
  set_id: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: string | null;
  security_stamp?: (keyof typeof CardSecurityStamp)[] | null;
  watermark?: string | null;
  preview?: Preview | null;
}
