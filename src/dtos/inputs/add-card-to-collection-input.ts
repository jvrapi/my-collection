import { Field, InputType } from "type-graphql";

@InputType()
export class AddCardToCollectionInput{
  @Field()
  quantity: number

  @Field()
  cardId: string
}