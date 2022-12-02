import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Card {
  
  @Field()
  id: string
  
  @Field()
  imageUrl: string

  @Field()
  addedAt: Date

  @Field()
  updatedAt: Date

  @Field()
  quantity: number
  
}