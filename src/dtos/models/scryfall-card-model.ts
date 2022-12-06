import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ScryfallCardModel {
  @Field()
    id: string;

  @Field()
    name: string;

  @Field()
    imageUrl: string;
}
