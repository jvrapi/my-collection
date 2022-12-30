import { Field, ObjectType } from 'type-graphql';
import { BaseCardModel } from './base-card-model';

@ObjectType()
export class UserCardModel extends BaseCardModel {
  @Field()
    addedAt: Date;

  @Field()
    updatedAt: Date;

  @Field()
    quantity: number;
}
