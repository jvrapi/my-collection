import { PaginationProvider } from '../../../../providers/pagination/pagination-provider';
import { scryfallCard, scryfallSet } from '../../../../tests/mocks/scryfall';
import { InMemoryScryfallRepository } from '../../repositories/in-memory-scryfall-repository';
import { GetSetsUseCase } from './get-sets-use-case';

describe('[unit] Get sets', () => {
  let scryfallRepository: InMemoryScryfallRepository;
  let paginationProvider: PaginationProvider;
  let getSetsUseCase: GetSetsUseCase;

  beforeEach(() => {
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard, scryfallSet);
    paginationProvider = new PaginationProvider();
    getSetsUseCase = new GetSetsUseCase(scryfallRepository, paginationProvider);
  });

  it('should be able to get a set list', async () => {
    const { items } = await getSetsUseCase.execute({ page: 1, limit: 5 });
    expect(items).toHaveLength(1);
  });
});
