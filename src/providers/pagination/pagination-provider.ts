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
  data: T[];
  dataTotalLength?: number;
  page: number;
  limit: number;
}

export class PaginationProvider {
  getDataPaginated<T>({
    data, dataTotalLength, limit, page
  }: Paginate<T>): Paginated<T> {
    const dataLength = dataTotalLength ?? data.length;
    const items = dataTotalLength ? data : this.paginateData(data, limit, page);
    const paginationControls = this.getPaginationControls(dataLength, limit, page);

    return {
      items,
      pagination: paginationControls,
    };
  }

  private getPaginationControls(dataLength:number, limit:number, page:number): PaginationControls {
    const lastPage = Math.ceil(dataLength / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      totalItems: dataLength,
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
