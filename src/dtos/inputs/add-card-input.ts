import { Field, InputType } from "type-graphql";

@InputType()
export class AddCardInput{
  @Field()
  quantity: number

  @Field()
  cardId: string
}