import { Inject, Service } from 'typedi';
import { PaginationProvider } from '../../../../providers/pagination/pagination-provider';
import { ScryfallRepository } from '../../repositories/scryfall-repository';

interface GetSetsRequest {
  page: number,
  limit: number
}

@Service()
export class GetSetsUseCase {
  constructor(
    @Inject('ScryfallRepository')
    private scryfallRepository: ScryfallRepository,
    @Inject('PaginationProvider')
    private paginationProvider: PaginationProvider
  ) {}

  async execute({ limit, page }: GetSetsRequest) {
    const sets = await this.scryfallRepository.getSets();
    const setsPaged = this.paginationProvider.getDataPaginated({
      data: sets,
      page,
      limit
    });
    return setsPaged;
  }
}
