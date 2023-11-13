import { Currency } from "@/common/enums/common.enums";
import { PerformedWorkInterface } from "@/common/types/entities.types";

export type CreatePerformedWorkResponseType = PerformedWorkInterface;

interface CreatePerformedWorkBodyInterface {
  title: string;
  description: string;
  price: number;
  currency: Currency;
  vehicleId: string;
  sparePartIds: string[];
}

export interface CreatePerformedWorkArgumentsInterface {
  body: CreatePerformedWorkBodyInterface;
}

export type GetPerformedWorkByIdResponseType = PerformedWorkInterface;

interface GetPerformedWorkByIdParamsInterface {
  id: string;
}

export interface GetPerformedWorkByIdArgumentsInterface {
  params: GetPerformedWorkByIdParamsInterface;
}

export type GetPerformedWorksByVehicleIdResponseType = PerformedWorkInterface[];

interface GetPerformedWorksByVehicleIdParamsInterface {
  vehicleId: string;
}

export interface GetPerformedWorksByVehicleIdArgumentsInterface {
  params: GetPerformedWorksByVehicleIdParamsInterface;
}
