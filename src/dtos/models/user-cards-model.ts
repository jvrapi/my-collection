import { Field, ObjectType } from 'type-graphql';
import { Pagination } from './pagination-model';
import { UserCardModel } from './user-card-model';

@ObjectType()
export class UserCardsModel {
  @Field(() => [UserCardModel])
    items: UserCardModel[];

  @Field()
    pagination: Pagination;
}
