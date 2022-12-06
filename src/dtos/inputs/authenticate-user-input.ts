import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthenticateUserInput {
  @Field()
    username: string;

  @Field()
    password: string;
}
