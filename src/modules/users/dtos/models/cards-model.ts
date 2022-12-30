import { Field, ObjectType } from 'type-graphql';
import { Pagination } from '../../../../dtos/models/pagination-model';
import { UserCard } from './card-model';

@ObjectType()
export class UserCards {
  @Field(() => [UserCard])
    items: UserCard[];

  @Field()
    pagination: Pagination;
}
