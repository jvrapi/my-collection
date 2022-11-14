import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(()=> String)
  async users(){
    return 'Hello world'
  }
}