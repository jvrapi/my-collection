import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
    id: string;

  @Field()
    name: string;

  @Field()
    username: string;

  @Field()
    email: string;

  @Field()
    createdAt: Date;

  @Field()
    updatedAt: Date;
}
