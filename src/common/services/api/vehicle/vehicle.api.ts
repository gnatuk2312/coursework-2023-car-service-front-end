import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateVehicleArgumentsInterface,
  CreateVehicleResponseType,
  GetAllVehiclesArgumentsInterface,
  GetAllVehiclesResponseType,
  GetVehicleByOwnerIdArgumentsInterface,
  GetVehiclesByOwnerIdResponseType,
} from "./vehicle.types";

export const createVehicleRequest = async (
  args: CreateVehicleArgumentsInterface
): Promise<CreateVehicleResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("vehicles", body);
};

export const getVehiclesByOwnerIdRequest = async (
  args: GetVehicleByOwnerIdArgumentsInterface
): Promise<GetVehiclesByOwnerIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(`/vehicles/owner/${params.ownerId}`);
};

export const getAllVehiclesRequest = async (
  args: GetAllVehiclesArgumentsInterface
): Promise<GetAllVehiclesResponseType> => {
  const { query } = args;

  return await authAxiosInstance.get("/vehicles", { params: query });
};
