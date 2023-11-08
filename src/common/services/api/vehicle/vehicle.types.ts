import { VehicleInterface } from "@/common/types/entities.types";

export type GetVehiclesByOwnerIdResponseType = VehicleInterface[];

interface GetVehicleByOwnerIdParamsInterface {
  ownerId: string;
}

export interface GetVehicleByOwnerIdArgumentsInterface {
  params: GetVehicleByOwnerIdParamsInterface;
}
