import { Field, InputType } from 'type-graphql';

@InputType()
export class GetCardsFilters {
  @Field()
    name: string;
}
