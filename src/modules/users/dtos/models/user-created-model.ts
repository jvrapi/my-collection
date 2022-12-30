import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserCreated {
  @Field()
    id: string;
}
