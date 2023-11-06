export interface AuthResponseInterface {
  accessToken: string;
}

export interface PaginatedDataInterface<T> {
  data: T[];
  totalFiltered: number;
  total: number;
}
