import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCardsInput{
  @Field()
  cardId: string

  @Field()
  quantity: number
}