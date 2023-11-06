import { SortDirection } from "@/common/enums/common.enums";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { ClientInterface } from "@/common/types/entities.types";

export type CreateClientResponseType = ClientInterface;

interface CreateClientBodyInterface {
  firstName: string;
  lastName: string;
  about?: string;
  email?: string;
  phone?: string;
}

export interface CreateClientArgumentsInterface {
  body: CreateClientBodyInterface;
}

export type GetAllClientsResponseType = PaginatedDataInterface<ClientInterface>;

interface GetAllClientsQueryInterface {
  skip?: number;
  take?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  search?: string;
}

export interface GetAllClientsArgumentsInterface {
  query: GetAllClientsQueryInterface;
}
