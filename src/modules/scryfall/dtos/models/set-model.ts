import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Set {
  @Field()
    id: string;

  @Field()
    name: string;

  @Field()
    code: string;

  @Field()
    releasedAt: string;

  @Field()
    iconUrl: string;
}
