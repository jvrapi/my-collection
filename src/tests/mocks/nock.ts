/* eslint-disable max-len */
import nock from 'nock';
import 'dotenv/config';

const apiUrl = process.env.SCRYFALL_API_URL as string;

const card = {
  object: 'card',
  id: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
  oracle_id: '0c2841bb-038c-4fbf-8360-bc0a1522b58d',
  multiverse_ids: [
    489840
  ],
  mtgo_id: 82368,
  tcgplayer_id: 218291,
  cardmarket_id: 482779,
  name: 'Exploration',
  lang: 'en',
  released_at: '2020-08-07',
  uri: 'https://api.scryfall.com/cards/ce4c6535-afea-4704-b35c-badeb04c4f4c',
  scryfall_uri: 'https://scryfall.com/card/2xm/167/exploration?utm_source=api',
  layout: 'normal',
  highres_image: true,
  image_status: 'highres_scan',
  image_uris: {
    small: 'https://cards.scryfall.io/small/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.jpg?1599707192',
    normal: 'https://cards.scryfall.io/normal/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.jpg?1599707192',
    large: 'https://cards.scryfall.io/large/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.jpg?1599707192',
    png: 'https://cards.scryfall.io/png/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.png?1599707192',
    art_crop: 'https://cards.scryfall.io/art_crop/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.jpg?1599707192',
    border_crop: 'https://cards.scryfall.io/border_crop/front/c/e/ce4c6535-afea-4704-b35c-badeb04c4f4c.jpg?1599707192'
  },
  mana_cost: '{G}',
  cmc: 1.0,
  type_line: 'Enchantment',
  oracle_text: 'You may play an additional land on each of your turns.',
  colors: [
    'G'
  ],
  color_identity: [
    'G'
  ],
  keywords: [],
  legalities: {
    standard: 'not_legal',
    future: 'not_legal',
    historic: 'not_legal',
    gladiator: 'not_legal',
    pioneer: 'not_legal',
    explorer: 'not_legal',
    modern: 'not_legal',
    legacy: 'legal',
    pauper: 'not_legal',
    vintage: 'legal',
    penny: 'not_legal',
    commander: 'legal',
    brawl: 'not_legal',
    historicbrawl: 'not_legal',
    alchemy: 'not_legal',
    paupercommander: 'not_legal',
    duel: 'legal',
    oldschool: 'not_legal',
    premodern: 'legal'
  },
  games: [
    'paper',
    'mtgo'
  ],
  reserved: false,
  foil: true,
  nonfoil: true,
  finishes: [
    'nonfoil',
    'foil'
  ],
  oversized: false,
  promo: false,
  reprint: true,
  variation: false,
  set_id: '372dafe8-b5d1-4b81-998f-3ae96b59498a',
  set: '2xm',
  set_name: 'Double Masters',
  set_type: 'masters',
  set_uri: 'https://api.scryfall.com/sets/372dafe8-b5d1-4b81-998f-3ae96b59498a',
  set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3A2xm&unique=prints',
  scryfall_set_uri: 'https://scryfall.com/sets/2xm?utm_source=api',
  rulings_uri: 'https://api.scryfall.com/cards/ce4c6535-afea-4704-b35c-badeb04c4f4c/rulings',
  prints_search_uri: 'https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2841bb-038c-4fbf-8360-bc0a1522b58d&unique=prints',
  collector_number: '167',
  digital: false,
  rarity: 'rare',
  flavor_text: '"Only when we journey into the unknown can we find the impossible."\n—Cyrul the Wanderer',
  card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
  artist: 'Florian de Gesincourt',
  artist_ids: [
    'f28c54ff-bbe3-485d-81a4-b2cb49430a52'
  ],
  illustration_id: '4281d9ff-0874-44cf-9142-07eb5df23829',
  border_color: 'black',
  frame: '2015',
  security_stamp: 'oval',
  full_art: false,
  textless: false,
  booster: true,
  story_spotlight: false,
  edhrec_rank: 351,
  preview: {
    source: 'Kavartech',
    source_uri: 'https://www.twitch.tv/videos/685481754',
    previewed_at: '2020-07-20'
  },
  prices: {
    usd: '23.52',
    usd_foil: '26.33',
    usd_etched: null,
    eur: '19.40',
    eur_foil: '20.00',
    tix: '6.23'
  },
  related_uris: {
    gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=489840',
    tcgplayer_infinite_articles: 'https://infinite.tcgplayer.com/search?contentMode=article&game=magic&partner=scryfall&q=Exploration&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
    tcgplayer_infinite_decks: 'https://infinite.tcgplayer.com/search?contentMode=deck&game=magic&partner=scryfall&q=Exploration&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
    edhrec: 'https://edhrec.com/route/?cc=Exploration'
  },
  purchase_uris: {
    tcgplayer: 'https://www.tcgplayer.com/product/218291?page=1&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
    cardmarket: 'https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Exploration&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
    cardhoarder: 'https://www.cardhoarder.com/cards/82368?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
  }
};

const sets = {
  object: 'list',
  has_more: false,
  data: [
    {
      object: 'set',
      id: 'c325b3f9-51e1-416b-83b1-138f11790dd1',
      code: 'slp',
      name: 'Secret Lair Showdown',
      uri: 'https://api.scryfall.com/sets/c325b3f9-51e1-416b-83b1-138f11790dd1',
      scryfall_uri: 'https://scryfall.com/sets/slp',
      search_uri: 'https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Aslp&unique=prints',
      released_at: '2023-02-17',
      set_type: 'promo',
      card_count: 3,
      parent_set_code: 'sld',
      digital: false,
      nonfoil_only: false,
      foil_only: true,
      icon_svg_uri: 'https://svgs.scryfall.io/sets/star.svg?1672030800'

    }
  ]
};

const cards = {
  object: 'list',
  total_cards: 1,
  has_more: false,
  data: [
    card
  ]
};

nock(apiUrl)
  .persist()
  .get('/sets')
  .reply(200, sets);

nock(apiUrl)
  .persist()
  .get('/cards/search')
  .query(true)
  .reply(200, cards);

nock(apiUrl)
  .persist()
  .get(/\/cards\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/g)
  .reply(200, card);
