import { Field, ObjectType } from 'type-graphql';
import { Pagination } from './pagination-model';
import { ScryfallCardModel } from './scryfall-card-model';

@ObjectType()
export class ScryfallPaginatedCardModel {
  @Field(() => [ScryfallCardModel])
    items: [ScryfallCardModel];

  @Field()
    pagination: Pagination;
}
