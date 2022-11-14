import { Query, Resolver, UseMiddleware } from "type-graphql";
import { EnsureAuthenticated } from "../middlewares/EnsureAuthenticated";

@Resolver()
export class UserResolver {
  @Query(()=> String)
  @UseMiddleware(EnsureAuthenticated)
  async users(){
    return 'Hello world'
  }

}