import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserCollectionInput {
  @Field(() => Int)
    page: number;

  @Field(() => Int)
    limit: number;
}
