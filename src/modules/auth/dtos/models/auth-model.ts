import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Auth {
  @Field()
    token: string;
}
