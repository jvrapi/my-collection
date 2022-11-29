import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Card {
  
  @Field()
  id: string
  
  @Field()
  imageUrl: string
  
}