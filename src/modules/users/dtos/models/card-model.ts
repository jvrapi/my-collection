import { Field, ObjectType } from 'type-graphql';
import { BaseCardModel } from '../../../../dtos/models/base-card-model';

@ObjectType()
export class UserCard extends BaseCardModel {
  @Field()
    addedAt: Date;

  @Field()
    updatedAt: Date;

  @Field()
    quantity: number;
}
