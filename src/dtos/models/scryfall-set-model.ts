import { Field, ObjectType } from 'type-graphql';
import { Pagination } from './pagination-model';
// import { Set } from '../../modules/scryfall/repositories/scryfall-repository';
import { Set } from './set-model';

@ObjectType()
export class ScryfallSetModel {
  @Field(() => [Set])
    items: [Set];

  @Field()
    pagination: Pagination;
}
