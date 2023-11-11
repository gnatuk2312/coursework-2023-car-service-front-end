import { SortDirection } from "@/common/enums/common.enums";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { VehicleInterface } from "@/common/types/entities.types";

export type CreateVehicleResponseType = VehicleInterface;

interface CreateVehicleBodyInterface {
  brand: string;
  model: string;
  year: string;
  additionalInfo?: string;
  licensePlate: string;
  engine: string;
  ownerId: string;
}

export interface CreateVehicleArgumentsInterface {
  body: CreateVehicleBodyInterface;
}

export type UpdateVehicleResponseType = VehicleInterface;

interface UpdateVehicleBodyInterface {
  brand: string;
  model: string;
  year: number;
  additionalInfo?: string | null;
  licensePlate: string;
  engine: string;
  ownerId: string;
}

interface UpdateVehicleParamsInterface {
  id: string;
}

export interface UpdateVehicleArgumentsInterface {
  body: UpdateVehicleBodyInterface;
  params: UpdateVehicleParamsInterface;
}

export type GetVehicleByIdResponseType = VehicleInterface;

interface GetVehicleByIdParamsInterface {
  id: string;
}

export interface GetVehicleByIdArgumentsInterface {
  params: GetVehicleByIdParamsInterface;
}

export type GetVehiclesByOwnerIdResponseType = VehicleInterface[];

interface GetVehicleByOwnerIdParamsInterface {
  ownerId: string;
}

export interface GetVehicleByOwnerIdArgumentsInterface {
  params: GetVehicleByOwnerIdParamsInterface;
}

export type GetAllVehiclesResponseType =
  PaginatedDataInterface<VehicleInterface>;

interface GetAllVehiclesQueryInterface {
  skip?: number;
  take?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  search?: string;
}

export interface GetAllVehiclesArgumentsInterface {
  query: GetAllVehiclesQueryInterface;
}
