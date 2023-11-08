import authAxiosInstance from "@/config/axios/auth-instance";
import {
  GetVehicleByOwnerIdArgumentsInterface,
  GetVehiclesByOwnerIdResponseType,
} from "./vehicle.types";

export const getVehiclesByOwnerIdRequest = async (
  args: GetVehicleByOwnerIdArgumentsInterface
): Promise<GetVehiclesByOwnerIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(`/vehicles/owner/${params.ownerId}`);
};
