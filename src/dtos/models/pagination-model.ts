import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int)
    totalItems: number;

  @Field(() => Int)
    currentPage: number;

  @Field(() => Int, { nullable: true, })
    nextPage?: number;

  @Field(() => Int, { nullable: true })
    prevPage?: number;

  @Field(() => Int)
    lastPage: number;
}
