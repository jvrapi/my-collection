import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class GetSetsInput {
  @Field(() => Int)
    page: number;

  @Field(() => Int)
    limit: number;
}
