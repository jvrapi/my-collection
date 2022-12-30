import { Field, ObjectType } from 'type-graphql';
import { Pagination } from '../../../../dtos/models/pagination-model';
import { Card } from './card-model';

@ObjectType()
export class Cards {
  @Field(() => [Card])
    items: [Card];

  @Field()
    pagination: Pagination;
}
