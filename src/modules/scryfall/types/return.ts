export interface Data<T, NOTFOUND = never> {
  data: T[];
  not_found?: NOTFOUND[];
}

export interface ScryReturn<T, NOTFOUND = never> extends Data<T, NOTFOUND> {
  object: 'list' | 'catalog';
  has_more: boolean | null;
  next_page: string | null;
  total_cards: number | null;
  total_values: number | null
}
