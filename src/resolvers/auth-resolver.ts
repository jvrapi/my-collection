import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { AuthenticateUserInput } from '../modules/auth/dtos/inputs/authenticate-user-input';
import { Auth } from '../modules/auth/dtos/models/auth-model';
import { AuthenticateUserUseCase } from '../modules/auth/use-cases/authenticate-user/authenticate-user-use-case';

@Service()
@Resolver()
export class AuthResolver {
  constructor(
    @Inject()
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Mutation(() => Auth)
  async authenticateUser(@Arg('data') data: AuthenticateUserInput) {
    const { username, password } = data;
    const token = await this.authenticateUserUseCase.execute({
      username,
      password,
    });
    return { token };
  }
}
