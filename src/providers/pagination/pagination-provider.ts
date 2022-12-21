export interface PaginationControls {
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

interface Paginated<T> {
  items: T[];
  pagination: PaginationControls;
}

interface Paginate<T> {
  data: T[],
  page: number,
  limit: number,
}

export class PaginationProvider {
  getDataPaginated<T>({ data, limit, page }: Paginate<T>): Paginated<T> {
    const paginationControls = this.getPaginationControls(data, limit, page);
    const items = this.paginateData(data, limit, page);

    return {
      items,
      pagination: paginationControls,
    };
  }

  private getPaginationControls<T>(data: T[], limit:number, page:number): PaginationControls {
    const lastPage = Math.ceil(data.length / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      totalItems: data.length,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  private paginateData<T>(data: T[], limit:number, page:number): T[] {
    return data.slice((page - 1) * limit, page * limit);
  }
}
