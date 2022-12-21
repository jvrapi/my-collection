import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetSetsInput } from '../dtos/inputs/get-sets-input';
import { ScryfallSetModel } from '../dtos/models/scryfall-set-model';
import { GetSetsUseCase } from '../modules/scryfall/use-cases/get-sets/get-sets-use-case';

@Service()
@Resolver()
export class SetResolver {
  constructor(
    @Inject()
    private getSetsUseCase: GetSetsUseCase
  ) {}

  @Query(() => ScryfallSetModel)
  async sets(
  @Arg('data') data: GetSetsInput
  ) {
    const { page, limit } = data;
    return this.getSetsUseCase.execute({ page, limit });
  }
}
