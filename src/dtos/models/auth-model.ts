import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthModel {
  @Field()
    token: string;
}
