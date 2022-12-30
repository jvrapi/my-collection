import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserCollectionFilters {
  @Field(() => Int)
    page: number;

  @Field(() => Int)
    limit: number;
}
