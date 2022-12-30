import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseCardModel {
  @Field()
    id: string;

  @Field()
    name: string;

  @Field()
    imageUrl: string;
}
