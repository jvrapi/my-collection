import { Field, ObjectType } from 'type-graphql';
import { Pagination } from '../../../../dtos/models/pagination-model';
import { Set } from './set-model';

@ObjectType()
export class Sets {
  @Field(() => [Set])
    items: [Set];

  @Field()
    pagination: Pagination;
}
