import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetSetsInput } from '../modules/scryfall/dtos/inputs/get-sets-input';
import { GetSetsUseCase } from '../modules/scryfall/use-cases/get-sets/get-sets-use-case';
import { Sets } from '../modules/scryfall/dtos/models/sets-model';

@Service()
@Resolver()
export class SetResolver {
  constructor(
    @Inject()
    private getSetsUseCase: GetSetsUseCase
  ) {}

  @Query(() => Sets)
  async sets(
  @Arg('data') data: GetSetsInput
  ) {
    const { page, limit } = data;
    return this.getSetsUseCase.execute({ page, limit });
  }
}
