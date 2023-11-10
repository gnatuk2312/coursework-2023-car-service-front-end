import { Currency, SortDirection } from "@/common/enums/common.enums";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { SparePartInterface } from "@/common/types/entities.types";

export type CreateSparePartResponseType = SparePartInterface;

interface CreateSparePartBodyInterface {
  title: string;
  brand: string;
  price: number;
  currency?: Currency;
}

export interface CreateSparePartArgumentsInterface {
  body: CreateSparePartBodyInterface;
}

export type GetAllSparePartsResponseType =
  PaginatedDataInterface<SparePartInterface>;

interface GetAllSparePartsQueryInterface {
  skip?: number;
  take?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  search?: string;
}

export interface GetAllSparePartsArgumentsInterface {
  query: GetAllSparePartsQueryInterface;
}
